const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const User = require("../schemas/user_schema");
const JWT_consfig = require("../configs/JWT_config");

const ip_DB = require("../schemas/ipwhitelist_schema");
const Loger = require("../utils/loger");

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

routes.get("/langsetttings", async (req, res) => {
  const reqIP = req.connection.remoteAddress;
  const ip = reqIP.replace("::ffff:", "");
  try {
    const isok = await ip_DB.findOne({ ip: ip }).select();
    if (isok.active) {
      res.stale(200).json({ suscsses: true, Lang: "Welcome to the jungel" });
    } else {
      res.stale(200).json({ suscsses: true, Lang: "EN" });
    }
  } catch (err) {
    console.log("faile IP");
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
