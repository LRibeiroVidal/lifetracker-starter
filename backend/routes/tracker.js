const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { createUser } = require("../utils/tokens");
const security = require("../middleware/security");
const db = require("../db");
const { BadRequestError } = require("../utils/errors");

router.post("/addExercise", async (req, res, next) => {
	try {
		const user = res.locals.user;
		const requiredParams = ["name", "category", "duration", "intensity"];
		requiredParams.forEach((requiredParam) => {
			if (!req.body.hasOwnProperty(requiredParam)) {
				throw new BadRequestError(
					`Missing required parameter: ${requiredParam}`
				);
			}
		});

		const query = `
			INSERT INTO exercise (name, category, duration, intensity, user_id)
			VALUES ($1, $2, $3, $4, $5);
		`;

		const response = await db.query(query, [
			req.body.name,
			req.body.category,
			req.body.duration,
			req.body.intensity,
			user.id,
		]);

		return res.status(201).json(response);
	} catch (err) {
		next(err);
	}
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
	try {
		const { email } = res.locals.user;
		const user = await User.fetchUserByEmail(email);
		const publicUser = User.makePublicUser(user);
		return res.status(200).json({ user: publicUser });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
