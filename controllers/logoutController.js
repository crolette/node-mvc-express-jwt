const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
	// on client, also delete the accesToken

	const cookies = req.cookies;

	// will send a 204 error fi the cookie do not exist and if the jwt do not exist
	if (!cookies?.jwt) return res.sendStatus(204); // No content
	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;

	// Is refreshToken in DB?
	const foundUser = usersDB.users.find(
		(person) => person.refreshToken === refreshToken
	);
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 100 });
		return res.sendStatus(204);
	}

	// Delete the refreshToken in the db
	const otherUsers = usersDB.users.filter(
		(person) => person.refreshToken != foundUser.refreshToken
	);
	const currentUser = {
		...foundUser,
		refreshToken: '',
	};
	usersDB.setUsers([...otherUsers, currentUser]);
	await fsPromises.writeFile(
		path.join(__dirname, '..', 'model', 'users.json'),
		JSON.stringify(usersDB.users)
	);

	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'None',
		secure: true,
		maxAge: 24 * 60 * 60 * 100,
	}); // secure: true, only serves on https, this would be needed in production
	res.sendStatus(204);
};

module.exports = { handleLogout };
