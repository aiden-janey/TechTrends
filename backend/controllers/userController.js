const express = require("express");
const { ObjectId } = require("mongodb");
let router = express.Router();
let User = require("../models/user.js");
let ev = require("email-validator");

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
  const { username, password, email } = req.body;

  if (ev.validate(email)) {
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
router.put("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

  console.log(req.body);

  await User.findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
