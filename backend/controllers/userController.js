import { Router } from "express";
import { ObjectId } from "mongodb";
const router = Router();
import User, {
  find,
  findById,
  exists,
  findByIdAndDelete,
  findByIdAndUpdate,
} from "../models/user.js";
import { validate } from "email-validator";
import Validation from "../utils/validation.js";
import { createHmac } from "node:crypto";
const uv = new Validation();

//Get All Users
router.get("/", (req, res) => {
  find({})
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

  findById(req.params.id)
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

  if (await exists({ email: email })) {
    return res.status(400).send("User Exists.");
  } else {
    if (
      validate(email) &&
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

  await findByIdAndDelete(req.params.id)
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

  await findByIdAndUpdate(req.params.id, req.body)
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

  await findByIdAndUpdate(req.params.id, req.body)
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

  await findByIdAndUpdate(req.params.id, req.body)
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

  await findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
      doc.currCity.push(req.body.currCity);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
