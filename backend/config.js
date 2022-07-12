require("dotenv").config();
require("colors");

const PORT = Number(process.env.PORT);
function getDatabaseUri() {
	const DATABASE_EMAL = process.env.DATABASE_EMAIL;
	const DATABASE_NAME = process.env.DATABASE_NAME;
	const DATABASE_PORT = process.env.DATABASE_PORT;
	const DATABASE_PASS = encodeURI(process.env.DATABASE_PASS);
	const DATABASE_HOST = process.env.DATABASE_HOST;

	return `postgresql://${DATABASE_EMAL}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
}

module.exports = {
	PORT,
	getDatabaseUri,
};
