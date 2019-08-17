const express = require("express");
const route = express.Router();
const FormattedDate = require("../utils/time_format");

const AFF = require("../schemas/aff_schema");

route.post("/addaff", (req, res) => {
  console.log(req.body);
  try {
    creatAFF(req.body).save();
    res.json({ sucsses: true, msg: "new aff Added" });
  } catch (err) {
    console.log("err on save aff");
    console.log(err);
  }
});

route.get("/getaff", (req, res) => {
  AFF.find({ active: true })
    .then(db_res => {
      res.json({ sucsses: true, msg: "get aff", data: db_res });
    })
    .catch(db_err => {
      console.log(db_err);
    });
});

route.put("/remvoeaff", (req, res) => {
  AFF.findOneAndUpdate({ affname: req.body }, { $set: { active: false } })
    .then(db_res => {
      res.json({ sucsses: true, msg: "aff is not Active" });
    })
    .catch(db_err => {
      console.log(db_err);
    });
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
