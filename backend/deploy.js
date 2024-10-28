const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controllers/userController.js");
const jobController = require("./controllers/jobController.js");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

const conn = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
});

conn.connect((err) => {
  if (err)
    console.log(
      `Error in DB Connection: ${JSON.stringify(err, undefined, 2)}.`
    );
  console.log("MySQL Connection Successful!");
});

// mongoose
//   .connect("mongodb://localhost:27017/techtrends")
//   .then(() => {
//     console.log("MongoDB Connection Successful!");
//   })
//   .catch((err) =>
//     console.log(`Error in DB Connection: ${JSON.stringify(err, undefined, 2)}`)
// );

app.use(cors());
app.use(express.json());

app.use("/users", userController);
app.use("/jobs", jobController);

app.listen(8080, () => console.log("Server Started on Port 8080"));
