const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const { createHmac } = require("node:crypto");
const validator = require("../utils/validator.js");
const generator = require("../utils/generator.js");
const db = require("../deploy.js");

//HTTP GET: Get Specific User Data
router.get("/:id", (req, res) => {
  let id = req.params.id;

  //validate id
  if (validator.validateId(id) == false) res.status(400).send("Invalid Id.");
  else {
    //check if userID exists
    db.module.query(
      `SELECT COUNT(id) FROM users WHERE id="${id}";`,
      (err, results, fields) => {
        if (err) console.log(err);
        if (results.length == 1) {
          db.module.query(
            `SELECT u.username, u.salary, u.age, u.country, p.position, l.lvl FROM users u LEFT JOIN users_positions up ON u.id = up.userId LEFT JOIN positions p ON up.positionId = p.id LEFT JOIN users_levels ul ON u.id = ul.userId LEFT JOIN levels l ON ul.levelId = l.id WHERE u.id = "${id}";`,
            (err, results, fields) => {
              if (err) console.log(err);
              return res.status(200).send(results);
            }
          );
        } else return res.status(400).send("ID Does Not Exist.");
      }
    );
  }
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

  //validate id
  if (validator.validateId(id) == false) res.status(400).send("Invalid Id.");
  else {
    //validate username
    if (validator.validateUsername(username) == false)
      res.status(400).send("Invalid Username.");
    else {
      //check if userID exists
      db.module.query(
        `SELECT COUNT(id) FROM users WHERE id="${id}";`,
        (err, results, fields) => {
          if (err) console.log(err);
          if (results.length == 1) {
            //update username in DB
            db.module.query(
              `UPDATE users SET username="${username}" WHERE id="${id}";`,
              (err, results) => {
                if (err) console.log(err);
                return res.status(200).send("Updated Username.");
              }
            );
          } else return res.status(400).send("ID Does Not Exist.");
        }
      );
    }
  }
});

//HTTP PATCH: Update Salary
router.patch("/:id/salary", (req, res) => {
  let salary = req.body.salary;
  let id = req.params.id;

  //validate id
  if (validator.validateId(id) == false) res.status(400).send("Invalid Id.");
  else {
    //validate salary
    if (validator.validateSalary(salary) == false) {
      res.status(400).send("Invalid Salary.");
      console.log(typeof salary);
    } else {
      //check if userID exists
      db.module.query(
        `SELECT COUNT(id) FROM users WHERE id="${id}";`,
        (err, results, fields) => {
          if (err) console.log(err);
          if (results.length == 1) {
            //update salary in DB
            db.module.query(
              `UPDATE users SET salary=${salary} WHERE id="${id}";`,
              (err, results) => {
                if (err) console.log(err);
                return res.status(200).send("Updated Salary.");
              }
            );
          } else return res.status(400).send("ID Does Not Exist.");
        }
      );
    }
  }
});

//HTTP PATCH: Update Age
router.patch("/:id/age", (req, res) => {
  let age = req.body.age;
  let id = req.params.id;

  //validate id
  if (validator.validateId(id) == false) res.status(400).send("Invalid Id.");
  else {
    //validate username
    if (validator.validateAge(age) == false)
      res.status(400).send("Invalid Age.");
    else {
      //check if userID exists
      db.module.query(
        `SELECT COUNT(id) FROM users WHERE id="${id}";`,
        (err, results, fields) => {
          if (err) console.log(err);
          if (results.length == 1) {
            //update age in DB
            db.module.query(
              `UPDATE users SET age=${age} WHERE id="${id}";`,
              (err, results) => {
                if (err) console.log(err);
                return res.status(200).send("Updated Age.");
              }
            );
          } else return res.status(400).send("ID Does Not Exist.");
        }
      );
    }
  }
});

//HTTP PATCH: Update Country
router.patch("/:id/country", (req, res) => {
  let country = req.body.country;
  let id = req.params.id;

  //validate id
  if (validator.validateId(id) == false) res.status(400).send("Invalid Id.");
  else {
    //validate username
    if (validator.validateCountry(country) == false)
      res.status(400).send("Invalid country.");
    else {
      //check if userID exists
      db.module.query(
        `SELECT COUNT(id) FROM users WHERE id="${id}";`,
        (err, results, fields) => {
          if (err) console.log(err);
          if (results.length == 1) {
            //update username in DB
            db.module.query(
              `UPDATE users SET country="${country}" WHERE id="${id}";`,
              (err, results) => {
                if (err) console.log(err);
                return res.status(200).send("Updated country.");
              }
            );
          } else return res.status(400).send("ID Does Not Exist.");
        }
      );
    }
  }
});

//HTTP PATCH: Update Position
router.patch("/:id/position", (req, res) => {
  let position = req.body.position;
  let id = req.params.id;

  //validate id
  if (validator.validateId(id) == false) res.status(400).send("Invalid Id.");
  else {
    //validate username
    if (validator.validatePosition(position) == false)
      res.status(400).send("Invalid Position.");
    else {
      //check if userID exists
      db.module.query(
        `SELECT COUNT(id) FROM users WHERE id="${id}";`,
        (err, results, fields) => {
          if (err) console.log(err);
          if (results.length == 1) {
            //update username in DB
            db.module.query(
              `SELECT id FROM positions WHERE position="${position}";`,
              (err, results, fields) => {
                if (err) console.log(err);
                if (results.length == 1) {
                  let posId = results[0].id;
                  db.module.query(
                    `INSERT INTO users_positions (userId, positionId) VALUES ("${id}", "${posId}");`,
                    (err, results, fields) => {
                      if (err) console.log(err);
                      return res.status(200).send("Position Updated.");
                    }
                  );
                } else {
                  return res.status(400).send("Position Does Not Exists.");
                }
              }
            );
          } else return res.status(400).send("ID Does Not Exist.");
        }
      );
    }
  }
});

//HTTP PATCH: Update Level
router.patch("/:id/level", (req, res) => {
  let level = req.body.level;
  let id = req.params.id;

  //validate id
  if (validator.validateId(id) == false) res.status(400).send("Invalid Id.");
  else {
    //validate username
    if (validator.validateLevel(level) == false)
      res.status(400).send("Invalid Position.");
    else {
      //check if userID exists
      db.module.query(
        `SELECT COUNT(id) FROM users WHERE id="${id}";`,
        (err, results, fields) => {
          if (err) console.log(err);
          if (results.length == 1) {
            //update level in DB
            db.module.query(
              `SELECT id FROM levels WHERE lvl="${level}";`,
              (err, results, fields) => {
                if (err) console.log(err);
                if (results.length == 1) {
                  let lvlId = results[0].id;
                  db.module.query(
                    `INSERT INTO users_levels (userId, levelId) VALUES ("${id}", "${lvlId}");`,
                    (err, results, fields) => {
                      if (err) console.log(err);
                      return res.status(200).send("Level Updated.");
                    }
                  );
                } else {
                  return res.status(400).send("Level Does Not Exists.");
                }
              }
            );
          } else return res.status(400).send("ID Does Not Exist.");
        }
      );
    }
  }
});

module.exports = router;
