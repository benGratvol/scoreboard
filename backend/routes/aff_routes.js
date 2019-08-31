const express = require("express");
const route = express.Router();
const FormattedDate = require("../utils/time_format");
const Loger = require("../utils/loger");

const adminAuth = require("../routes_middleware/admin_auth");
const authtoken = require("../routes_middleware/token_auth");

const AFF = require("../schemas/aff_schema");

route.post("/addaff", adminAuth, (req, res) => {
  try {
    creatAFF(req.body).save();
    Loger.log("new Affiliate Add ");
    res.json({ sucsses: true, msg: "new aff Added" });
  } catch (err) {
    Loger.errlog("Error add aff");
    console.log(err);
  }
});

route.get("/getaff", authtoken, async (req, res) => {
  try {
    const activeAff = await AFF.find({ active: true });
    res.json({ sucsses: true, msg: "get aff", data: activeAff });
  } catch (err) {
    Loger.errlog("Error get aff");
    console.log(err);
  }
});

route.put("/remvoeaff", adminAuth, async (req, res) => {
  try {
    await AFF.findByIdAndUpdate(
      { affname: req.body },
      { $set: { active: false } }
    );
    res.json({ sucsses: true, msg: "AFF is not Active" });
  } catch (err) {
    Loger.errlog("Error remove aff");
    console.log(db_err);
  }
});

function creatAFF(paylode) {
  const { aff } = paylode;
  return (newAFF = new AFF({
    affname: aff,
    active: true,
    createdDate: FormattedDate.HumanDate()
  }));
}
module.exports = route;
