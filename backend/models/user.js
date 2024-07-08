import { Schema, model } from "mongoose";

const schema = new Schema({
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

const User = model("User", schema);

export default User;
