const express = require("express");
const { ObjectId } = require("mongodb");
let router = express.Router();
let { Job } = require("../models/jobs/job.js");
const mongoose = require("mongoose");
let { Parser } = require("../utils/parser.js");

//Get All Jobs
router.get("/", async (req, res) => {
  await Job.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Create A Job
router.post("/:id/:position", async (req, res) => {
  let parse = new Parser();
  let job = parse.reqParsing(req);

  await job
    .save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
