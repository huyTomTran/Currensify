const express = require("express");
const users = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("../Model/user");
var schedule = require("node-schedule");

users.use(cors());

process.env.SECRET_KEY = "secret";

//register a user
users.post("/register", (req, res) => {
  const today = new Date();

  let email = req.body.email;
  let displayName = req.body.displayName;
  let password = req.body.password;
  let created = today;
  let isLoggedIn = false;

  if (email === "" || password === "") res.send("Error, empty parameters");

  const userData = new User({
    email,
    password,
    created,
    isLoggedIn,
  });

  console.log("user: " + userData);

  //verify if email exist
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      //if user doesn't exist
      console.log("x: " + user);

      console.log(!user);
      if (!user) {
        //encrypt password and hash it with 10 salts
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;

          //create new user and save it
          userData
            .save()
            .then(() => {
              res.json("Success");
            })
            .catch((err) => res.status(400).json("Error: " + err));
        });
      } else {
        res.json({ error: "User already exist" });
      }
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

//reset password
// users.put("/reset_password/:id", (req, res) => {
//   const id = req.params.id;

//   console.log(req.body.password);
//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     let password = req.body.password;
//     password = hash;

//     console.log(password);
//     //update
//     User.updateOne({ _id: id }, { $set: { password: password } })
//       .then(() => {
//         res.send("Password reset for " + id);
//       })
//       .catch((err) => {
//         err.send(err);
//       });
//   });
// });

users.put("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      //compare data if it is true
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.isLoggedIn) {
          res.send("User already logged");
        } else {
          User.findOneAndUpdate(
            {
              email: req.body.email,
            },
            { $set: { isLoggedIn: true } }
          )
            .then(() => {
              //auto reset isLoggedin to false
              // schedule.scheduleJob(
              //   "*/1 * * * * ",
              //   () => {
              //     console.log("testing...");
              //     User.findOneAndUpdate(
              //       {
              //         email: req.body.email,
              //       },
              //       { $set: { isLoggedIn: false } }
              //     );
              //   },
              //   5000
              // );

              res.send("Success");
            })
            .catch(() => {
              res.send("Error");
            });
        }
      } else {
        //password don't match
        res.json({ error: "Error, password does not match" });
      }
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

users.put("/logout", (req, res) => {
  User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    { $set: { isLoggedIn: false } }
  )
    .then(() => {
      res.send("Logged out");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = users;
