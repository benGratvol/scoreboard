const express = require("express");
const route = express.Router();
const FormattedDate = require("../utils/time_format");
const Loger = require("../utils/loger");

const adminCheck = require("../routes_middleware/admin_auth");
const AuthToken = require("../routes_middleware/token_auth");

const Prosseor = require("../schemas/processors_schema");

route.post("/addprosseor", adminCheck, async (req, res) => {
  try {
    const newprosser = await creatProsseor(req.body).save();
    Loger.log("new Prosser Add");
    res.status(200).json({ sucsses: true, msg: "new Prosseor Added" });
  } catch (err) {
    Loger.errlog(" Error new Prosser Add");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "Error Prosseor Added" });
  }
});

route.get("/getprosseor", AuthToken, async (req, res) => {
  try {
    const db_res = await Prosseor.find({ active: true });
    res.status(200).json({ sucsses: true, msg: "getProsser", data: db_res });
  } catch (err) {
    Loger.errlog(" Error get Prosser");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "Error Prosseor Get" });
  }
});

route.put("/remvoeprocessors", adminCheck, async (req, res) => {
  try {
    const db_res = await Prosseor.findByIdAndUpdate(
      { processors: req.body },
      { $set: { active: false } }
    );
    res.status(200).json({ sucsses: true, msg: "prosseor is not Active" });
  } catch (err) {
    Loger.errlog(" Error Ban Prosser");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "Error Prosseor Ban" });
  }
});

function creatProsseor(paylode) {
  const { processors } = paylode;
  return (newProsseor = new Prosseor({
    processors: processors,
    active: true,
    createdDate: FormattedDate.HumanDate()
  }));
}

module.exports = route;
