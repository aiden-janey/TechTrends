const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  /*currSalary: {
    type: [String],
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
  },*/
});

const User = mongoose.model("User", schema);

module.exports = User;
