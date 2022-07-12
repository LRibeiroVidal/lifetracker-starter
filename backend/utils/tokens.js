const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function generateToken(data) {
	const token = jwt.sign(data, SECRET_KEY);
	return token;
}

function createUser(user) {
	const payload = {
		email: user.email,
		isAdmin: user.isAdmin || false,
	};

	return generateToken(payload);
}

function validateToken(token) {
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		return decoded;
	} catch {
		return {};
	}
}

module.exports = {
	generateToken,
	createUser,
	validateToken,
};
