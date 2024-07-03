const mongoose = require("mongoose");
let { Job } = require("../models/jobs/job.js");

let webDevJob = new Job();

webDevJob.languages = [String];
webDevJob.frameworks = [String];

const schema = new mongoose.Schema(webDevJob);

const WebDev = mongoose.model("WebDev", schema);

module.exports = { WebDev };
