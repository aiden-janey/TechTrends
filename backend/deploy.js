const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/users.route.js");
const jobRoute = require("./routes/jobs.route.js");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
});

db.connect((err) => {
  if (err)
    console.log(
      `Error in DB Connection: ${JSON.stringify(err, undefined, 2)}.`
    );
  console.log("MySQL Connection Successful!");
});

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/jobs", jobRoute);

app.listen(8080, () => console.log("Server Started on Port 8080"));

exports.module = db;
