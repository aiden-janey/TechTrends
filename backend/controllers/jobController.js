import { Router } from "express";
const router = Router();
import { SWE } from "../models/jobs/swe.js";
import { DA } from "../models/jobs/da.js";
import { DS } from "../models/jobs/ds.js";

//Get All Jobs
router.get("/", async (req, res) => {
  let jobs = [];
  await SWE.find({})
    .then((docs) => {
      jobs.push(docs);
    })
    .catch((err) => {
      console.log(`Error in Retrieving SWE Jobs: ${err}`);
    });

  await DA.find({})
    .then((docs) => {
      jobs.push(docs);
    })
    .catch((err) => {
      console.log(`Error in Retrieving DA Jobs: ${err}`);
    });

  await DS.find({})
    .then((docs) => {
      jobs.push(docs);
    })
    .catch((err) => {
      console.log(`Error in Retrieving DS Jobs: ${err}`);
    });

  res.send(jobs);
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
    case "da":
      job = new DA({
        userId: req.params.id,
        position: req.params.position,
        attendance: req.body.attendance,
        level: req.body.level,
        education: req.body.education,
        experience: req.body.experience,
        software: req.body.software,
        languages: req.body.languages,
        databases: req.body.databases,
        company: req.body.company,
        site: req.body.site,
        address: req.body.address,
        city: req.body.city,
        link: req.body.link,
      });
      break;
    case "ds":
      job = new DS({
        userId: req.params.id,
        position: req.params.position,
        attendance: req.body.attendance,
        level: req.body.level,
        education: req.body.education,
        experience: req.body.experience,
        software: req.body.software,
        languages: req.body.languages,
        libraries: req.body.libraries,
        company: req.body.company,
        databases: req.body.databases,
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

export default router;
