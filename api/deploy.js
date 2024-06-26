const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/techtrends", (err) => {
  if (!err) console.log("MongoDB Connection Successful!");
  else
    console.log(
      "Error in Database Connection: " + JSON.stringify(err, undefined, 2)
    );
});

let jobController = require("./controllers/jobController.js");

let app = express();
// app.use(bodyParser.json());
// app.use(cors({ origin: "http://localhost:4200" }));

app.listen(8080, () => console.log("Server Started on Port 8080"));

app.use("/jobs", jobController);
