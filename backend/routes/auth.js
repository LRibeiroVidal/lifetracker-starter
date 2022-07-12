const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("colors");

router.post("/login", async (req, res, next) => {
	try {
		const user = await User.login(req.body);
		return res.status(201).send({ user });
	} catch (err) {
		return next(err);
	}
});

router.post("/register", async (req, res, next) => {
	try {
		const user = await User.register(req.body);
		return res.status(201).send({ user });
	} catch (err) {
		console.log("ERROR HERE: ", err);
		return next(err);
	}
});

module.exports = router;
