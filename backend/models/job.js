//Schema Definition for Job
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Job = mongoose.model(
  "Job",
  new mongoose.Schema({
    userId: {
      type: ObjectId,
      required: true,
    },
  }),
  "jobs"
);

module.exports = { Job };
