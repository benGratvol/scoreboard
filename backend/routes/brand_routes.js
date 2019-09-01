const express = require("express");
const route = express.Router();
const FormattedDate = require("../utils/time_format");
const Loger = require("../utils/loger");
const adminAuth = require("../routes_middleware/admin_auth");
const authtoken = require("../routes_middleware/token_auth");

const Brand = require("../schemas/brand_schema");

route.post("/addbrand", adminAuth, (req, res) => {
  try {
    creatBrand(req.body).save();
    Loger.log("new Brand Add");
    res.status(200).json({ sucsses: true, msg: "new Brand Added" });
  } catch (err) {
    Loger.errlog("Error add brand");
    console.log(err);
    res.status(500);
  }
});

route.get("/getbrands", authtoken, async (req, res) => {
  try {
    const activeAff = await Brand.find({ active: true });
    res.status(200).json({ sucsses: true, msg: "get brand", data: activeAff });
  } catch (err) {
    Loger.errlog("Error get brand");
    console.log(err);
    res.status(500);
  }
});

route.put("/remvoebrand", adminAuth, async (req, res) => {
  try {
    await Brand.findByIdAndUpdate(
      { brandname: req.body },
      { $set: { active: false } }
    );
    res.status(200).json({ sucsses: true, msg: "Brand is not Active" });
  } catch (err) {
    Loger.errlog("Error remove brand");
    console.log(db_err);
    res.status(500).json({ sucsses: true, msg: "Error on ban Brand" });
  }
});

function creatBrand(paylode) {
  const { brandname } = paylode;
  return (newAFF = new Brand({
    brandname: brandname,
    active: true,
    createdDate: FormattedDate.HumanDate()
  }));
}
module.exports = route;
