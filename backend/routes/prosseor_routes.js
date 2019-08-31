const express = require("express");
const route = express.Router();
const FormattedDate = require("../utils/time_format");

const adminCheck = require("../routes_middleware/admin_auth");
const AuthToken = require("../routes_middleware/token_auth");

const Prosseor = require("../schemas/processors_schema");

route.post("/addprosseor", adminCheck, async (req, res) => {
  try {
    const newprosser = await creatProsseor(req.body).save();
    console.log(`[*] new Prosser Add [*]`);
    res.json({ sucsses: true, msg: "new Prosseor Added" });
  } catch (err) {
    console.log(`[-] Error new Prosser Add [-] \n`);
    console.log(err);
  }
});

route.get("/getprosseor", AuthToken, (req, res) => {
  Prosseor.find({ active: true })
    .then(db_res => {
      res.json({ sucsses: true, msg: "getProsser", data: db_res });
    })
    .catch(db_err => {
      console.log(`[-] Error get prosser [-] \n`);
      console.log(db_err);
    });
});

route.put("/remvoeprocessors", adminCheck, (req, res) => {
  Prosseor.findOneAndUpdate(
    { processors: req.body },
    { $set: { active: false } }
  )
    .then(db_res => {
      res.json({ sucsses: true, msg: "prosseor is not Active" });
    })
    .catch(db_err => {
      console.log(`[-] Error remove prosser [-] \n`);
      console.log(db_err);
    });
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
