const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require("./controllers/userController.js");
const jobController = require("./controllers/jobController.js");
const app = express();
//app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/techtrends")
  .then(() => {
    console.log("MongoDB Connection Successful!");
  })
  .catch((err) =>
    console.log(`Error in DB Connection: ${JSON.stringify(err, undefined, 2)}`)
  );

app.use("/users", userController);
app.use("/jobs", jobController);

app.listen(8080, () => console.log("Server Started on Port 8080"));
