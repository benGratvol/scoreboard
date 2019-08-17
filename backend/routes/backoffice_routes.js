const express = require("express");
const routes = express.Router();

const Dep_DB = require("../schemas/deposit_schema");
const Agent_DB = require("../schemas/agent_schema");

routes.get("/setup", async (req, res) => {
  console.log(req.body);
  const agents = await Agent_DB.find().select("agent team");
  const setup = teamAndAgentuniq(agents);
  res.json({ sucsses: true, msg: "hit", data: setup });
});

// need to fix and clean up !!!--------
routes.put("/search", async (req, res) => {
  console.log(req.body);
  if (req.body.from_date !== "" && req.body.to_date !== "") {
    const data = await Dep_DB.find({
      client_dor: { $gte: req.body.from_date, $lt: req.body.to_date }
    });
    console.log(data);
    res.json({ sucsses: true, msg: "sucsses", data: data });
  } else {
    const query = req.body;
    console.log(req.body);
    const data = await Dep_DB.find(query);
    res.json({ sucsses: true, msg: "sucsses", data: data });
  }
});

routes.put("/update", async (req, res) => {
  console.log(req.body);
  const query = { _id: req.body._id };
  const { docs_sent, deposit_vertifi } = req.body.update;
  if (docs_sent === "" && deposit_vertifi === "") {
    return res.json({ sucsses: true, msg: "no Val Set", data: data });
  } else {
    try {
      const update = await Dep_DB.findOneAndUpdate(query, req.body.update, {
        upsert: true
      });
      res.json({ sucsses: true, msg: "Update Val" });
    } catch (err) {
      console.log(err);
    }
  }
});

// -------------------  sum componet back office ---------------
routes.get("/sumDocs", async (req, res) => {
  try {
    const Docs = await Dep_DB.find().select("docs_sent");
    const DocFilter = type => Docs.filter(val => val.docs_sent == type);
    const resPaylode = {
      totalDocs: Docs.length,
      noDocs: DocFilter("no_docs").length,
      hasDocs: DocFilter("has_docs").length,
      sentreq: DocFilter("sent_request").length
    };
    res.json({ sucsses: true, msg: "sucsses sumDocs ", data: resPaylode });
  } catch (err) {
    console.log(err);
  }
});

routes.get("/verifi", async (req, res) => {
  try {
    const Docs = await Dep_DB.find().select("deposit_vertifi");
    const DocFilter = type => Docs.filter(val => val.deposit_vertifi == type);
    const resPaylode = {
      chb: DocFilter("chb").length,
      pending: DocFilter("Pending").length,
      verifid: DocFilter("yes").length,
      notverifid: DocFilter("no").length
    };
    console.log(resPaylode);
    res.json({ sucsses: true, msg: "sucsses verifi ", data: resPaylode });
  } catch (err) {
    console.log(err);
  }
});
// -------------------   End sum componet back office ---------------

/// privet funcks ----------------------------
function teamAndAgentuniq(data) {
  const teams = [...new Set(data.map(x => x.team))];
  const agents = [...new Set(data.map(x => x.agent))];
  return { team: teams, agent: agents };
}

module.exports = routes;
