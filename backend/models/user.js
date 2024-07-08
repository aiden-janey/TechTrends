const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currSalary: {
    type: [Number],
    required: false,
  },
  currJob: {
    type: [String],
    required: false,
  },
  currLvl: {
    type: [String],
    required: false,
  },
  currCity: {
    type: [String],
    required: false,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
