const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

function jwtFrom({ headers }) {
	if (headers?.authorization) {
		const [scheme, token] = headers.authorization.split(" ");

		if (scheme.trim() == "Bearer") {
			console.log("TOKENS ", token);
			return token.trim();
		}
	}

	return undefined;
}

const extractUserFromJwt = (req, res, next) => {
	try {
		const token = jwtFrom(req);
		if (token) {
			res.locals.user = jwt.verify(token, SECRET_KEY);
		}
		return next();
	} catch (err) {
		console.log("this error right here");
		return next(err);
	}
};

const requireAuthenticatedUser = (req, res, next) => {
	try {
		const { user } = res.locals;

		if (!user?.email) {
			throw new UnauthorizedError("User authentication failed");
		}
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	extractUserFromJwt,
	requireAuthenticatedUser,
};
