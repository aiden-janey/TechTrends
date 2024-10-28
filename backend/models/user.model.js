const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salaries: {
    type: [Number],
    required: false,
  },
  jobs: {
    type: [String],
    required: false,
  },
  levels: {
    type: [String],
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
