const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const { createHmac, randomBytes } = require("node:crypto");
const {
  validateUsername,
  validateInteger,
  validateCountry,
  validateEmail,
  validateId,
  validatePassword,
  validateSalary,
} = require("../utils/validation.js");
const db = require("../deploy.js");

//HTTP GET: Get Specific User Data
router.get("/data", (req, res) => {
  let id = req.body.id;
  let query =
    "SELECT u.username, u.salary, u.age, u.country, p.position, l.lvl FROM users u LEFT JOIN users_positions up ON u.id = up.userId" +
    " LEFT JOIN positions p ON up.positionId = p.id LEFT JOIN users_levels ul ON u.id = ul.userId LEFT JOIN levels l ON ul.levelId = l.id WHERE u.id = ?;";

  if (validateId(id)) {
    db.module.query(query, [id], (err, rows) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (rows.length == 0) {
        return res.status(400).send("User Not Found.");
      } else {
        return res.status(200).send(rows[0]);
      }
    });
  } else {
    res.status(400).send("Invalid Id.");
  }
});

//HTTP GET: Request User ID given Email & Password
router.get("/login", (req, res) => {
  let { passwd, email } = req.body;
  let query = "SELECT id FROM users WHERE email=? AND passwd=?;";

  if (validateEmail(email) && validatePassword(passwd)) {
    //encrypt password
    let encryptedPasswd = createHmac("sha256", passwd)
      .update("Encrypt")
      .digest("hex");

    //find if user exists & return user id
    db.module.execute(query, [email, encryptedPasswd], (err, rows) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (rows.length == 1) {
        return res.status(200).send(rows[0]);
      } else {
        return res.status(400).send("Incorrect Email or Password.");
      }
    });
  } else {
    return res.status(400).send("Invalid Email or Password.");
  }
});

//HTTP POST: Send Email & Password & Create New User
router.post("/signup", (req, res) => {
  let { passwd, email } = req.body;
  let query = "SELECT COUNT(email) AS count FROM users WHERE email=?;";
  let insert = "INSERT INTO users(id, email, passwd) VALUES (?, ?, ?);";

  if (validateEmail(email) && validatePassword(passwd)) {
    //check if user exists
    db.module.execute(query, [email], (err, rows) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (rows[0].count == 1) {
        return res.status(400).send("Email in Use.");
      } else {
        //encrypt password
        let encryptedPasswd = createHmac("sha256", passwd)
          .update("Encrypt")
          .digest("hex");

        //Insert newUser into DB
        db.module.execute(
          insert,
          [randomBytes(3 * 4).toString("base64"), email, encryptedPasswd],
          (err, rows) => {
            if (err) {
              return res.status(500).send(`DB Error: ${err}`);
            }
            return res.status(200).send("User Created.");
          }
        );
      }
    });
  } else {
    return res.status(400).send("Invalid Email/Password.");
  }
});

//HTTP PATCH: Update Username
router.patch("/data/username", (req, res) => {
  let username = req.body.username;
  let id = req.body.id;
  let update = "UPDATE users SET username=? WHERE id=?;";

  if (validateId(id) && validateUsername(username)) {
    //check if userID exists
    db.module.execute(update, [username, id], (err, results) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (results.affectedRows == 1) {
        return res.status(200).send("Updated Username.");
      } else {
        return res.status(400).send("User Not Found.");
      }
    });
  } else {
    res.status(400).send("Invalid Username/ID.");
  }
});

//HTTP PATCH: Update Salary
router.patch("/data/salary", (req, res) => {
  let salary = req.body.salary;
  let id = req.body.id;
  let update = "UPDATE users SET salary=? WHERE id=?;";

  if (validateId(id) && validateSalary(salary)) {
    //check if userID exists
    db.module.execute(update, [salary, id], (err, results) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (results.affectedRows == 1) {
        return res.status(200).send("Updated Salary.");
      } else {
        return res.status(400).send("User Not Found.");
      }
    });
  } else {
    res.status(400).send("Invalid Salary/ID.");
  }
});

//HTTP PATCH: Update Age
router.patch("/data/age", (req, res) => {
  let age = req.body.age;
  let id = req.body.id;
  let update = "UPDATE users SET age=? WHERE id=?;";

  if (validateId(id) && validateInteger(age)) {
    //check if userID exists
    db.module.execute(update, [age, id], (err, results) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (results.affectedRows == 1) {
        return res.status(200).send("Updated Age.");
      } else {
        return res.status(400).send("User Not Found.");
      }
    });
  } else {
    res.status(400).send("Invalid Age/ID.");
  }
});

//HTTP PATCH: Update Country
router.patch("/data/country", (req, res) => {
  let country = req.body.country;
  let id = req.body.id;

  let update = "UPDATE users SET country=? WHERE id=?;";

  if (validateId(id) && validateCountry(country)) {
    //check if userID exists
    db.module.execute(update, [country, id], (err, results) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (results.affectedRows == 1) {
        return res.status(200).send("Updated Country.");
      } else {
        return res.status(400).send("User Not Found.");
      }
    });
  } else {
    res.status(400).send("Invalid Country/ID.");
  }
});

//HTTP PATCH: Update Position
router.patch("/data/position", (req, res) => {
  let userId = req.body.userId;
  let posId = req.body.posId;
  let insert =
    "INSERT INTO users_positions (userId, positionId) VALUES (?, ?);";

  if (validateId(userId) && validateInteger(posId)) {
    //check if userID exists
    db.module.execute(insert, [userId, posId], (err, results) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (results.affectedRows == 1) {
        return res.status(200).send("Updated Position.");
      } else {
        return res.status(400).send("User Not Found.");
      }
    });
  } else {
    res.status(400).send("Invalid Position/ID.");
  }
});

//HTTP PATCH: Update Level
router.patch("/data/level", (req, res) => {
  let userId = req.body.userId;
  let lvlId = req.body.lvlId;
  let insert = "INSERT INTO users_levels (userId, levelId) VALUES (?, ?);";

  if (validateId(userId) && validateInteger(lvlId)) {
    //check if userID exists
    db.module.execute(insert, [userId, lvlId], (err, results) => {
      if (err) {
        return res.status(500).send(`DB Error: ${err}`);
      } else if (results.affectedRows == 1) {
        return res.status(200).send("Updated Level.");
      } else {
        return res.status(400).send("User Not Found.");
      }
    });
  } else {
    res.status(400).send("Invalid Level/ID.");
  }
});

module.exports = router;
