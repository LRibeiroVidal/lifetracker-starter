const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { createUser } = require("../utils/tokens");
const security = require("../middleware/security");

router.post("/login", async (req, res, next) => {
	try {
		const user = await User.login(req.body);
		const token = createUser(user);
		res.locals.token = token;
		res.locals.user = user;
		console.log(res.locals.user);

		return res.status(200).json({ user, token });
	} catch (err) {
		next(err);
	}
});

router.post("/register", async (req, res, next) => {
	try {
		const user = await User.register({ ...req.body, isAdmin: false });
		const token = createUser(user);

		res.locals.token = token;
		res.locals.user = user;
		return res.status(201).json({ user, token });
	} catch (err) {
		next(err);
	}
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
	try {
		const { email } = res.locals.user;
		const user = await User.fetchUserByEmail(email);

		const publicUser = await User.makePublicUser(user);
		console.log("AFSJALKGNFKGNA: ", publicUser);
		return res.status(200).json({ publicUser: publicUser });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
