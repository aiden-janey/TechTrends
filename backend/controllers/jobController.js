const express = require("express");
let router = express.Router();
let { Job } = require("../models/job.model.js");

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
  let job = new Job({
    userId: req.params.id,
    position: req.params.position,
    attendance: req.body.attendance,
    level: req.body.level,
    education: req.body.education,
    experience: req.body.experience,
    tools: req.body.tools,
    software: req.body.software,
    languages: req.body.languages,
    frameworks: req.body.frameworks,
    libraries: req.body.libraries,
    databases: req.body.databases,
    company: req.body.company,
    site: req.body.site,
    address: req.body.address,
    city: req.body.city,
    link: req.body.link,
    date: req.body.date,
  });

  await job
    .save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get Total Count of Languages
router.get("/languages", async (req, res) => {
  const langCounts = new Map();
  await Job.find({})
    .then((docs) => {
      docs.forEach((doc) => {
        let arr = doc.languages;
        for (let i = 0; i < arr.length; i++) {
          if (langCounts.has(arr[i])) {
            let currCount = langCounts.get(arr[i]);
            currCount++;
            langCounts.set(arr[i], currCount);
          } else {
            langCounts.set(arr[i], 1);
          }
        }
      });
      res.send(langCounts);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
