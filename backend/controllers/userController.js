const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const User = require("../models/user.js");
const ev = require("email-validator");
const Validation = require("../utils/validation.js");
const { createHmac } = require("node:crypto");
const uv = new Validation();

//Get All Users
router.get("/", (req, res) => {
  User.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log(
        `Error in Retrieving Users: ${JSON.stringify(err, undefined, 2)}`
      );
    });
});

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

//Create A User
router.post("/", async (req, res) => {
  let { username, password, email } = req.body;

  if (await User.exists({ email: email })) {
    return res.status(400).send("User Exists.");
  } else {
    if (
      ev.validate(email) &&
      uv.validUsername(username) &&
      uv.validPassword(password)
    ) {
      let hash = createHmac("sha256", password).update("Encrypt").digest("hex");
      password = hash;
      let u = new User({ username, password, email });

      await u
        .save()
        .then((doc) => {
          res.send(doc);
          console.log(`Hello ${doc.body.JSON}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.status(400).send("Invalid Username, Email or Password.");
    }
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
      doc.currSalary.push(req.body.currSalary);
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
      doc.currJob.push(req.body.currJob);
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
      doc.currLvl.push(req.body.currLvl);
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
      doc.currCity.push(req.body.currCity);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
