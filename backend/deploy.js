import express from "express";
import { json } from "body-parser";
import { connect } from "mongoose";

const app = express();
app.use(json());

connect("mongodb://localhost:27017/techtrends")
  .then(() => {
    console.log("MongoDB Connection Successful!");
  })
  .catch((err) =>
    console.log(`Error in DB Connection: ${JSON.stringify(err, undefined, 2)}`)
  );

import userController from "./controllers/userController.js";
import jobController from "./controllers/jobController.js";

app.use("/users", userController);
app.use("/jobs", jobController);

app.listen(8080, () => console.log("Server Started on Port 8080"));
