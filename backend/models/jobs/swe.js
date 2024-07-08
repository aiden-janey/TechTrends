const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const schema = new mongoose.Schema({
  userId: {
    type: ObjectId,
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
    type: [Number],
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
});

const SWE = mongoose.model("SWE", schema);

module.exports = { SWE };
