const express = require("express");
const route = express.Router();
const IP_DB = require("../schemas/ipwhitelist_schema");
const AuthAdmin = require("../routes_middleware/admin_auth");
const FormattedDate = require("../utils/time_format");

route.post("/addIP", AuthAdmin, async (req, res) => {
  console.log(req.connection.remoteAddress);
  const ip = req.body.ip;
  try {
    const newentry = await newIP(ip).save();
    res.json({ sucsses: true, msg: "Save Sucsses" });
    console.log(`[*] Sucsses to save add ip [*]`);
  } catch (err) {
    res.json({ sucsses: false, msg: "Save Fail" });
    console.log(`[-] Faile to save add ip [-]`);
    console.log(err);
  }
});

route.put("/banserver", async (req, res) => {
  const ip = req.body.ip;
  try {
    const banIP = IP_DB.findOneAndUpdate(
      { ip: ip },
      { active: false },
      { upsert: true }
    );
    console.log(`[*] Sucsses ip was band [*]`);
    res.json({ sucsses: true, msg: "IP was Band" });
  } catch (err) {
    console.log(`[-] Fail ip was band [-]`);
    console.log(err);
    res.json({ sucsses: false, msg: "Error on Ban IP" });
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
