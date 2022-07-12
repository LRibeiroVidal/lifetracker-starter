const { Client } = require("pg");
const { getDatabaseUri } = require("./config.js");
require("colors");

console.log("Database Uri: ".blue, getDatabaseUri());
const db = new Client({ connectionString: getDatabaseUri() });

db.connect((err) => {
	if (err) {
		console.error("Connection Failed: ".red, err.stack);
	} else {
		console.log("Success connecting to database".blue);
	}
});

module.exports = db;
