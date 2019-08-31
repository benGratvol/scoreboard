const express = require("express");
const route = express.Router();
const FormattedDate = require("../utils/time_format");

const adminAuth = require("../routes_middleware/admin_auth");
const authtoken = require("../routes_middleware/token_auth");

const Brand = require("../schemas/brand_schema");

route.post("/addbrand", adminAuth, (req, res) => {
  try {
    creatBrand(req.body).save();
    console.log(`[*] new Brand Add [*]`);
    res.json({ sucsses: true, msg: "new Brand Added" });
  } catch (err) {
    console.log(`[-] Error add brand [-] \n`);
    console.log(err);
  }
});

route.get("/getbrands", authtoken, async (req, res) => {
  try {
    const activeAff = await Brand.find({ active: true });
    res.json({ sucsses: true, msg: "get brand", data: activeAff });
  } catch (err) {
    console.log(`[-] Error get brand [-] \n`);
    console.log(err);
  }
});

route.put("/remvoebrand", adminAuth, async (req, res) => {
  try {
    await Brand.findByIdAndUpdate(
      { brandname: req.body },
      { $set: { active: false } }
    );
    res.json({ sucsses: true, msg: "Brand is not Active" });
  } catch (err) {
    console.log(`[-] Error remove brand [-] \n`);
    console.log(db_err);
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
