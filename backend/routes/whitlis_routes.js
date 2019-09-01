const express = require("express");
const route = express.Router();
const IP_DB = require("../schemas/ipwhitelist_schema");
const AuthAdmin = require("../routes_middleware/admin_auth");
const FormattedDate = require("../utils/time_format");
const Loger = require("../utils/loger");

route.post("/addIP", AuthAdmin, async (req, res) => {
  console.log(req.connection.remoteAddress);
  const ip = req.body.ip;
  try {
    const newentry = await newIP(ip).save();
    res.status(200).json({ sucsses: true, msg: "Save Sucsses" });
    Loger.log("Sucsses to save add ip");
  } catch (err) {
    Loger.errlog("Error to save add ip");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "Save Fail" });
  }
});

route.put("/banserver", async (req, res) => {
  const ip = req.body.ip;
  try {
    const banIP = await IP_DB.findOneAndUpdate(
      { ip: ip },
      { active: false },
      { upsert: true }
    );
    res.status(200).json({ sucsses: true, msg: "IP was Band" });
    Loger.log("Sucsses ip was band");
  } catch (err) {
    Loger.errlog("Error ip was band");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "Error on Ban IP" });
  }
});

function newIP(ip) {
  return new IP_DB({
    ip: ip,
    active: true,
    createdDate: FormattedDate.HumanDate()
  });
}

module.exports = route;
