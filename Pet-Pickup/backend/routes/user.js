const Router = require("express-promise-router");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

const router = new Router();

module.exports = router;


// Adding a new User
router.post("/signup", async (req, res, next) => {
  let username = req.body.username;
  let password;
  let user;
  await db
    .query("select * from users where username = ($1) limit 1", [username])
    .then(result => {
      user = result.rows[0];
    });
  if (user !== undefined) {
    // someone already has that username send error
    return res.status(206).json({
      message: "Username taken, please try again!",
      result: ``,
      accountCreated: false
    });
  } else {
    // username is available
    try {
      bcrypt.hash(req.body.password, 2).then(hash => {
        password = hash;
      });
      await db.query("BEGIN");
      await db
        .query(
          " INSERT INTO users( username, password ) " + " VALUES ( $1, $2 ) ;",
          [username, password]
        )
        .then(result => {
          res.status(201).json({
            message: "User Created!",
            result: result,
            accountCreated: true
          });
        });
      await db.query("COMMIT");
    } catch (e) {
      console.log(`Failed to create new user... ${e}`);
      await db.query("ROLLBACK");
      return res.status(409).json({
        message: "Unable to create username, please try again!",
        result: `${e}`,
        accountCreated: false
      });
    }
  }
});


// Trying to login
router.post("/login", async (req, res, next) => {
  let user;
  let token;
  await db
    .query("select * from users where username = ($1) limit 1", [
      req.body.username
    ])
    .then(result => {
      user = result.rows[0];
    });

  if (user === undefined) {
    // no username match
    return res.status(401).json({
      message: "Login Failed. Please check your username, and password."
    });
  } else {
    // check password
    try {
      const match = bcrypt.compare(req.body.password, user.password);
      if (match) {
        //login
        token = jwt.sign(
          { username: user.username, userid: user.id },
          "secret_should_beLonger",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Login successful!",
          token: token,
          expiresIn: 3600
        });
      }
    } catch (e) {
      console.log(`Failed to login... ${e}`);
      return res.status(401).json({
        message:
          "Login Failed. Please check your username, and password. Please try again!",
        result: `${e}`
      });
    }
  }
});

