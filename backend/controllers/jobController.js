const express = require("express");
const { ObjectId } = require("mongodb");
let router = express.Router();
let { SWE } = require("../models/jobs/swe.js");

//Get All Jobs
router.get("/", (req, res) => {
  SWE.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log(
        `Error in Retrieving Users: ${JSON.stringify(err, undefined, 2)}`
      );
    });
});

//Create A Job
router.post("/:id/:position", async (req, res) => {
  let job;

  switch (req.params.position) {
    case "swe":
      job = new SWE({
        userId: req.params.id,
        position: req.params.position,
        attendance: req.body.attendance,
        level: req.body.level,
        education: req.body.education,
        experience: req.body.experience,
        tools: req.body.tools,
        languages: req.body.languages,
        frameworks: req.body.frameworks,
        company: req.body.company,
        site: req.body.site,
        address: req.body.address,
        city: req.body.city,
        link: req.body.link,
      });
      break;
  }

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
