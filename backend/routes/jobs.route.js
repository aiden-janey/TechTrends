const express = require("express");
let router = express.Router();
const db = require("../deploy.js");

//HTTP GET: Get All Jobs
router.get("/", (req, res) => {
  let query = "SELECT * FROM all_jobs;";
  db.module.execute(query, (err, rows) => {
    if (err) {
      return res.status(500).send(`DB Error: ${err}`);
    } else {
      return res.status(200).send(rows);
    }
  });
});

//HTTP GET: Get Jobs Uploaded by User
router.get("/uploaded-jobs", (req, res) => {
  let userId = req.body.userId;
  let query =
    "SELECT * FROM jobs j JOIN users_jobs uj ON j.id=uj.jobId JOIN users u ON u.id=uj.?;";
  db.module.execute(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).send(`DB ${err}`);
    } else if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("User Not Found.");
    }
  });
});

//HTTP POST: Upload Job Data
router.post("/upload-job", (req, res) => {
  let {
    title,
    education,
    experience,
    company,
    addr,
    city,
    province,
    country,
    link,
    postDate,
  } = req.body;

  let insert =
    "INSERT INTO jobs (title, education, experience, company, addr, city," +
    "province, country, link, postDate) VALUES (?,?,?,?,?,?,?,?,?);";

  db.module.execute(
    insert,
    [
      title,
      education,
      experience,
      company,
      addr,
      city,
      province,
      country,
      link,
      postDate,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send(`DB ${err}`);
      }
      return res.status(200).send("Job Created.");
    }
  );
});

module.exports = router;
