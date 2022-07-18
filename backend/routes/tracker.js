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
				req.body.user_id,
			]);

			const allExerciseQ = `
		SELECT * FROM exercise WHERE user_id = $1;
		`;

			const allExerciseR = await db.query(allExerciseQ, [req.body.user_id]);

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
			const allExerciseR = await db.query(allExerciseQ, [req.body.user_id]);
			return res.status(200).json(allExerciseR);
		} catch (err) {
			next(err);
		}
	}
);

router.get(
	"/getNutrition",
	security.requireAuthenticatedUser,
	async (req, res, next) => {
		try {
			const getNutritonQ = `
			SELECT *
			FROM nutrition
			INNER JOIN users ON (exercise.user_id = users.id)
			WHERE email = $1;
			`;
			const userEmail = res.locals.user.email;

			const getNutritionR = await db.query(getNutritionQ, [userEmail]);
			return res.status(200).json(getNutritionR);
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	"/addNutrition",
	security.requireAuthenticatedUser,
	async (req, res, next) => {
		try {
			const user = res.locals.user;
			const requiredParams = ["name", "category", "quantity", "calories"];
			requiredParams.forEach((requiredParam) => {
				if (!req.body.hasOwnProperty(requiredParam)) {
					throw new BadRequestError(
						`Missing required parameter: ${requiredParam}`
					);
				}
			});
			const query = `
			INSERT INTO nutrition (name, category, quantity, calories, image_url, user_id)
			VALUES ($1, $2, $3, $4, $5, $6);
		`;

			const response = await db.query(query, [
				req.body.name,
				req.body.category,
				req.body.quantity,
				req.body.calories,
				req.body.image ? req.body.image : "",
				req.body.user_id,
			]);

			const allNutritionQ = `
		SELECT * FROM nutrition WHERE user_id = $1;
		`;

			const allNutritionR = await db.query(allNutritionQ, [req.body.user_id]);

			return res.status(201).json(allNutritionR);
		} catch (err) {
			console.log(err.stack);
			next(err);
		}
	}
);

router.get(
	"/getActivity",
	security.requireAuthenticatedUser,
	async (req, res, next) => {
		try {
			const getExerciseQ = `
			SELECT ROUND(AVG(duration))
			FROM exercise
			INNER JOIN users ON (exercise.user_id = users.id)
			WHERE email = $1;
			`;
			const userEmail = res.locals.user.email;

			var getActivityR = { exercise: "", nutrition: "", sleep: "" };

			getActivityR.exercise = await db.query(getExerciseQ, [userEmail]);

			const getNutritionQ = `
			SELECT ROUND(AVG(calories))
			FROM nutrition
			INNER JOIN users ON (nutrition.user_id = users.id)
			WHERE email = $1;
			`;

			getActivityR.nutrition = await db.query(getNutritionQ, [userEmail]);

			const getSleepQ = `
			SELECT COUNT(users.id)
			FROM sleep
			INNER JOIN users ON (sleep.user_id = users.id)
			WHERE email = $1;
			`;

			getActivityR.sleep = await db.query(getSleepQ, [userEmail]);
			return res.status(200).json(getActivityR);
		} catch (err) {
			next(err);
		}
	}
);

router.get(
	"/getSleep",
	security.requireAuthenticatedUser,
	async (req, res, next) => {
		try {
			const getSleepQ = `
			SELECT *
			FROM sleep
			INNER JOIN users ON (sleep.user_id = users.id)
			WHERE email = $1;
			`;
			const userEmail = res.locals.user.email;

			const getSleepR = await db.query(getSleepQ, [userEmail]);
			return res.status(200).json(getSleepR);
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	"/addSleep",
	security.requireAuthenticatedUser,
	async (req, res, next) => {
		try {
			const user = res.locals.user;
			const requiredParams = ["start", "end"];
			requiredParams.forEach((requiredParam) => {
				if (!req.body.hasOwnProperty(requiredParam)) {
					throw new BadRequestError(
						`Missing required parameter: ${requiredParam}`
					);
				}
			});
			const query = `
			INSERT INTO sleep (start_time, end_time, user_id)
			VALUES ($1, $2, $3);
		`;

			const response = await db.query(query, [
				req.body.start,
				req.body.end,
				req.body.user_id,
			]);

			const allSleepQ = `
		SELECT * FROM sleep WHERE user_id = $1;
		`;

			const allSleepR = await db.query(allSleepQ, [req.body.user_id]);

			return res.status(201).json(allSleepR);
		} catch (err) {
			console.log(err.stack);
			next(err);
		}
	}
);

module.exports = router;
