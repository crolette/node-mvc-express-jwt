const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

require('dotenv').config();
const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res, next) => {
	const cookies = req.cookies;
	console.log(cookies)
	// will send a 401 error fi the cookie do not exist and if the jwt do not exist
	if (!cookies?.jwt) return res.sendStatus(401);
	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;

	const foundUser = usersDB.users.find(
		(person) => person.refreshToken === refreshToken
	);
	if (!foundUser) return res.sendStatus(403); //forbidden
	// evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.username !== decoded.username)
			return res.sendStatus(403);
		const accessToken = jwt.sign(
			{ username: decoded.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		);
		res.json({ accessToken });
		next()
	});
};

module.exports = { handleRefreshToken };
