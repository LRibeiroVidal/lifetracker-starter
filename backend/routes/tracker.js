const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { createUser } = require("../utils/tokens");
const security = require("../middleware/security");
const db = require("../db");
const { BadRequestError } = require("../utils/errors");

router.post(
	"/addExercise",
	security.requireAuthenticatedUser,
	async (req, res, next) => {
		console.log("HO MATE");
		try {
			console.log("HERE TOO MATE");
			const user = res.locals.user;
			const requiredParams = ["name", "category", "duration", "intensity"];
			requiredParams.forEach((requiredParam) => {
				if (!req.body.hasOwnProperty(requiredParam)) {
					throw new BadRequestError(
						`Missing required parameter: ${requiredParam}`
					);
				}
			});
			console.log("HERE MATE");
			const query = `
			INSERT INTO exercise (name, category, duration, intensity, user_id)
			VALUES ($1, $2, $3, $4, $5);
		`;

			const response = await db.query(query, [
				req.body.name,
				req.body.category,
				req.body.duration,
				req.body.intensity,
				req.body.user_id,
			]);

			const allExerciseQ = `
		SELECT * FROM exercise WHERE user_id = $1;
		`;

			const allExerciseR = await db.query(allExerciseQ, [req.body.user_id]);

			console.log("Success: ", allExerciseR);
			return res.status(201).json(allExerciseR);
		} catch (err) {
			console.log(err.stack);
			next(err);
		}
	}
);

router.post(
	"/getExercises",
	security.requireAuthenticatedUser,
	async (req, res, next) => {
		try {
			const allExerciseQ = `
		SELECT * FROM exercise WHERE user_id = $1;
		`;
			console.log("BODY ", req);
			const allExerciseR = await db.query(allExerciseQ, [req.body.user_id]);
			return res.status(200).json(allExerciseR);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
