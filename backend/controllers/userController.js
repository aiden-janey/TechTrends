const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const User = require("../models/user.model.js");
const ev = require("email-validator");
const Validation = require("../utils/validation.js");
const { createHmac } = require("node:crypto");
const uv = new Validation();
const db = require("../deploy.js");

//Get A User
router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("User Not Found");

  User.findById(req.params.id)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//HTTP GET
router.get("/login", (req, res) => {
  let [username, email, passwd] = req.body;

  if (ev.validate(email) && uv.validPassword(passwd)) {
    User.findOne({ email: email, password: passwd })
      .then((doc) => {
        res.send(doc._id);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return res.status(400).send("Account Not Found");
  }
});

//HTTP POST
router.post("/signup", (req, res) => {
  let { username, passwd, email } = req.body;
  let userId = "test";
  let userExists = false;
  //check if user exists
  db.module.query(
    `SELECT username, email FROM users WHERE username="${username}" OR email="${email}";`,
    (err, result, fields) => {
      if (err) console.log(err);
      if (result.length >= 1) userExists = true;
    }
  );
  if (userExists) {
    return res.status(400).send("Username and/or Email already in use.");
  } else {
    //backend validation
    if (ev.validate(email) && uv.validPassword(passwd)) {
      //encrypt password with userId
      let hash = createHmac("sha256", passwd).update("Encrypt").digest("hex");
      passwd = hash;
      console.log(passwd);

      //Insert into db
      db.module.query(
        `INSERT INTO users(id, username, email, passwd) VALUES ("${userId}", "${username}", "${email}", "${passwd}");`,
        (err, result, fields) => {
          if (err) console.log(err);
          res.send(result);
        }
      );
    } else return res.status(400).send("Invalid Username, Email or Password.");
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

  await User.findByIdAndDelete(req.params.id)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Current Salary
router.put("/:id/salary", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

  await User.findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
      doc.salaries.push(req.body.currSalary);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Current Job
router.put("/:id/job", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

  await User.findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
      doc.jobs.push(req.body.currJob);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Current Level
router.put("/:id/level", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

  await User.findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
      doc.levels.push(req.body.currLvl);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Current City
router.put("/:id/city", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

  await User.findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
      doc.city = req.body.city;
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
