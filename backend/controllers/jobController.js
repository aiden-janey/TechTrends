const express = require("express");
let router = express.Router();
let { Job } = require("../models/job.model.js");
const db = require("../deploy.js");

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
router.post("/:id/insert", async (req, res) => {
  let job = new Job({
    userId: req.params.id,
    position: req.body.position,
    attendance: req.body.attendance,
    level: req.body.level,
    education: req.body.education,
    experience: req.body.experience,
    tools: req.body.tools,
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

//Get Language Count, visualized PieChart
router.get("/rechart/language_counts", async (req, res) => {
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

//Get Job Count, visualized as Treemap

router.get("/recharts/position_counts", async (req, res) => {
  await Job.find({})
    .then((docs) => {
      const jobCounts = new Map();
      docs.forEach((doc) => {
        let pos = doc.position;
        if (jobCounts.has(pos)) {
          let counter = jobCounts.get(pos);
          counter++;
          jobCounts.set(pos, counter);
        } else {
          jobCounts.set(pos, 1);
        }
      });

      let arr = [];

      jobCounts.forEach((size, name) => {
        arr.push({ name, size });
      });

      res.send(JSON.stringify(arr));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
