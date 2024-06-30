const express = require("express");
const { ObjectId } = require("mongodb");
let router = express.Router();
let { User } = require("../models/user.js");

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
      console.log(
        `Error in Retrieving User: ${JSON.stringify(err, undefined, 2)}`
      );
    });
});

//Create A User
router.post("/", (req, res) => {
  let u = new User({
    username: req.body["username"],
    password: req.body["password"],
    email: req.body["email"],
  });

  u.save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(`Error in User Save: ${JSON.stringify(err, undefined, 2)}`);
    });
});

//Delete User
router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

  User.findByIdAndRemove(req.params.id)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log("Error in User Delete: " + JSON.stringify(err, undefined, 2));
    });
});

module.exports = router;
