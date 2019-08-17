const express = require("express");
const route = express.Router();
const FormattedDate = require("../utils/time_format");

const Prosseor = require("../schemas/processors_schema");

route.post("/addprosseor", (req, res) => {
  try {
    creatProsseor(req.body).save();
    res.json({ sucsses: true, msg: "new Prosseor Added" });
  } catch (e) {
    console.log("err on save Prosser");
  }
});

route.get("/getprosseor", (req, res) => {
  Prosseor.find({ active: true })
    .then(db_res => {
      res.json({ sucsses: true, msg: "getProsser", data: db_res });
    })
    .catch(db_err => {
      console.log(db_err);
    });
});

route.put("/remvoeprocessors", (req, res) => {
  Prosseor.findOneAndUpdate(
    { processors: req.body },
    { $set: { active: false } }
  )
    .then(db_res => {
      res.json({ sucsses: true, msg: "prosseor is not Active" });
    })
    .catch(db_err => {
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
