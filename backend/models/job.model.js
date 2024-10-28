//Schema Definition for Job
const mongoose = require("mongoose");

const schema = {
  username: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  attendance: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: false,
  },
  experience: {
    type: Number,
    required: true,
  },
  tools: {
    type: [String],
    required: false,
  },
  languages: {
    type: [String],
    required: false,
  },
  frameworks: {
    type: [String],
    required: false,
  },
  libaries: {
    type: [String],
    required: false,
  },
  databases: {
    type: [String],
    required: false,
  },
  site: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
};

const Job = mongoose.model("Job", schema, "jobs");

module.exports = { Job };
