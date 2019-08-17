const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const User = require("../schemas/user_schema");
const JWT_consfig = require("../configs/JWT_config");

routes.put("/auth", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.json({ suscsses: false, msg: "Auth Fail" });
  } else {
    bcrypt.compare(password, user.password, (err, bcryptres) => {
      if (err) {
        res.json({
          suscsses: false,
          msg: "Auth Fail"
        });
      } else {
        if (bcryptres) {
          const userToken = {
            username: user.username,
            role: user.role,
            permission: user.permission,
            team: user.team
          };
          jwt.sign(userToken, JWT_consfig.Secret, (err, token) => {
            if (err) {
              res.json({ suscsses: true, msg: "Auth Fail Token" });
            } else {
              res.json({
                suscsses: true,
                msg: "log in ",
                user: userToken,
                token: token
              });
            }
          });
        } else {
          res.json({ suscsses: true, msg: "Auth Fail " });
        }
      }
    });
  }
});

module.exports = routes;

// *********  test user ********
// {
//   "username" : "admi125",
//    "password" : "test12",
//    "role" : "admin12",
//    "permission" : "5",
//    "team" : "test3"
//  }
