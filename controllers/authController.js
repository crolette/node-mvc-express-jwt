const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};
const bcrypt = require('bcrypt');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' });
	const foundUser = usersDB.users.find((person) => person.username === user);
	if (!foundUser) return res.sendStatus(401); //Unauthorized
	// evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		// create JWTs

		const accessToken = jwt.sign(
			{ username: foundUser.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		);

		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);

		// Saving refreshToken with current user
		// create an array of all the users that are not logged in
		const otherUsers = usersDB.users.filter(
			(person) => person.username !== foundUser.username
		);

		const currentUser = { ...foundUser, refreshToken };
		usersDB.setUsers([...otherUsers, currentUser]);

		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);
		// cookie name jwt that will last 1 day
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'None',
			maxAge: 24 * 60 * 60 * 100,
		});
        // res.json({ success: `User ${user} is logged in!` });
        // send the accessToken as JSON
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
};

module.exports = { handleLogin };
