const db = require("../db");
const { BadRequestError, UnauthorizedAccessError } = require("../utils/errors");
const bcrypt = require("bcrypt");

class User {
	static async makePublicUser(user) {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.first_name,
			lastName: user.last_name,
		};
	}

	static async login(credentials) {
		const requiredFields = ["email", "password"];
		requiredFields.forEach((required) => {
			if (!credentials.hasOwnProperty(required)) {
				throw new BadRequestError(`Invalid ${required} provided`);
			}
		});
		const user = await this.fetchUserByEmail(credentials.email.toLowerCase());

		if (user) {
			const validPassword = await bcrypt.compare(
				credentials.password,
				user.password
			);

			if (validPassword) {
				return User.makePublicUser(user);
			}
		}

		throw new UnauthorizedAccessError("Incorrect Password");
	}

	static async register(credentials) {
		const requiredFields = [
			"email",
			"password",
			"username",
			"firstName",
			"lastName",
		];
		requiredFields.forEach((required) => {
			if (!credentials.hasOwnProperty(required)) {
				throw new BadRequestError(`Invalid ${required} provided`);
			}
		});

		if (credentials.email.indexOf("@") <= 0) {
			throw new BadRequestError(`Invalid Email: ${credentials.email}`);
		}

		const existingUser = this.fetchUserByEmail(credentials.email);

		if (!existingUser) {
			throw new BadRequestError(`User ${credentials.email} already exists`);
		}

		const lowerCaseEmail = credentials.email.toLowerCase();
		const hashedPassword = await bcrypt.hash(credentials.password, 10);
		const result = await db.query(
			`
			INSERT INTO users(
				email,
				username,
				password,
				first_name,
				last_name
			)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING email, username, password, first_name, last_name;
		`,
			[
				lowerCaseEmail,
				credentials.username,
				hashedPassword,
				credentials.firstName,
				credentials.lastName,
			]
		);
		console.log("RESULT: ", result);
		const user = result.rows[0];
		return User.makePublicUser(user);
	}

	static async fetchUserByEmail(email) {
		if (!email)
			throw new BadRequestError("Please provide a valid email address");

		const query = `SELECT * FROM users WHERE email = $1`;
		const result = await db.query(query, [email.toLowerCase()]);

		const user = result.rows[0];

		return user;
	}

	static async fetchUserByUsername(username) {
		if (!username) {
			throw new BadRequestError("No username provided");
		}

		const query = `SELECT * FROM users WHERE username = $1`;

		const result = await db.query(query, [username]);

		const user = result.rows[0];

		return user;
	}
}

module.exports = User;
