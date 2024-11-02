const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const { createHmac } = require("node:crypto");
const validator = require("../utils/validator.js");
const generator = require("../utils/generator.js");
const db = require("../deploy.js");

router.get("/", (req, res) => {
  db.module.query("SELECT * FROM users;", (err, results, fields) => {
    if (err) console.log(err);
    res.send(results);
  });
});

//HTTP GET: Request User ID given Email & Password
router.get("/login", (req, res) => {
  let { passwd, email } = req.body;
  let isValid =
    validator.validateEmail(email) && validator.validatePassword(passwd);

  //validate user input
  if (!isValid) {
    return res.status(400).send("Invalid Email or Password.");
  }

  //encrypt password
  let hash = createHmac("sha256", passwd).update("Encrypt").digest("hex");
  passwd = hash;

  //find if user exists & return user id
  db.module.query(
    `SELECT id FROM users WHERE email="${email}" AND passwd="${passwd}";`,
    (err, results, fields) => {
      if (err) console.log(err);
      if (results.length == 1) return res.status(200).send(results);
    }
  );
});

//HTTP POST: Send Email & Password & Create New User
router.post("/signup", (req, res) => {
  let { passwd, email } = req.body;
  let isValid =
    validator.validateEmail(email) && validator.validatePassword(passwd);

  //validate user input
  if (!isValid) {
    return res.status(400).send("Invalid Email or Password.");
  }

  //check if user exists
  db.module.query(
    `SELECT COUNT(email) FROM users WHERE email="${email}";`,
    (err, results, fields) => {
      if (err) console.log(err);
      if (results.length == 1)
        return res.status(400).send("Account already Exists.");
    }
  );

  //encrypt password
  let hash = createHmac("sha256", passwd).update("Encrypt").digest("hex");
  passwd = hash;

  //generate userId
  let userId = generator.generateUserId();

  //Insert newUser into DB
  db.module.query(
    `INSERT INTO users(id, email, passwd) VALUES ("${userId}", "${email}", "${passwd}");`,
    (err, results, fields) => {
      if (err) console.log(err);
      return res.status(200).send(results);
    }
  );
});

//HTTP PATCH: Update Username
router.patch("/:id/username", (req, res) => {
  let username = req.body.username;
  let id = req.params.id;

  //validate username
  if (validator.validateUsername(username) == false)
    res.status(400).send("Invalid Username.");

  //TODO: check if userID exists
  db.module.query(
    `SELECT COUNT(id) FROM users WHERE id="${id}";`,
    (err, results, fields) => {
      if (err) console.log(err);
      if (results.length != 1)
        return res.status(400).send("ID Does Not Exist.");
      if (results.length == 1) {
        //update username in DB
        db.module.query(
          `UPDATE users SET username="${username}" WHERE id="${id}";`,
          (err, results) => {
            if (err) console.log(err);
            return res.status(200).send("Updated Username.");
          }
        );
      }
    }
  );
});

//Update Salary
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

//Update Position
router.put("/:id/position", async (req, res) => {
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

//Update Level
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

//Update Age
router.put("/:id/age", async (req, res) => {
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

//Update Country
router.put("/:id/country", async (req, res) => {
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

module.exports = router;
