const express = require("express");
const routes = express.Router();
const fs = require("fs");

const csvjson = require("csvjson");

const Dep_DB = require("../schemas/deposit_schema");
const Agent_DB = require("../schemas/agent_schema");
const Users_DB = require("../schemas/user_schema");

routes.get("/exportDeposits", async (req, res) => {
  const db_res = await Dep_DB.find();
  const jsonObj = JSON.stringify(db_res);
  const csvData = csvjson.toCSV(jsonObj, {
    headers: "key"
  });
  fs.writeFile("file.csv", csvData, err => {
    if (err) {
      console.log("err on save file", err);
      res.json({ sucsses: false, msg: "fail to save" });
    }
    res.json({ sucsses: true, msg: "Save Sucsses" });
  });
});

routes.get("/exportAgents", async (req, res) => {
  const db_res = await Agent_DB.find();
  const jsonObj = JSON.stringify(db_res);
  const csvData = csvjson.toCSV(jsonObj, {
    headers: "key"
  });
  fs.writeFile("file_Agents.csv", csvData, err => {
    if (err) {
      console.log("err on save file", err);
      res.json({ sucsses: false, msg: "fail to save" });
    }
    res.json({ sucsses: true, msg: "Save Sucsses" });
  });
});

routes.get("/exportUsers", async (req, res) => {
  const db_res = await Users_DB.find();
  const jsonObj = JSON.stringify(db_res);
  const csvData = csvjson.toCSV(jsonObj, {
    headers: "key"
  });
  fs.writeFile("file_Users.csv", csvData, err => {
    if (err) {
      console.log("err on save file", err);
      res.json({ sucsses: false, msg: "fail to save" });
    }
    res.json({ sucsses: true, msg: "Save Sucsses" });
  });
});

async function SavetoCsvFile(filename, DB_res) {
  const jsonObj = JSON.stringify(DB_res);
  const csvData = csvjson.toCSV(jsonObj, {
    headers: "key"
  });
  const res = await fs.watchFile(filename, csvData, err => {
    if (er) {
      console.log("err on save file", err);
      return { sucsses: false, msg: "fail to save" };
    }
    return { sucsses: true, msg: "Save Sucsses" };
  });
  return res;
}

module.exports = routes;
