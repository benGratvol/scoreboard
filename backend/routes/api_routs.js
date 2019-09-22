const express = require("express");
const routes = express.Router();
const DepositSchema = require("../schemas/deposit_schema");

const APIKey_auth = require("../routes_middleware/backoffice_api_auth");

routes.get("/getDeposits/:key", APIKey_auth, async (req, res) => {
  const db_re = await DepositSchema.find().select("-_id");
  res.status(200).json(db_re);
});
module.exports = routes;
