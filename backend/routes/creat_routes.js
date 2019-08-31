const express = require("express");

const routes = express.Router();

const FormattedDate = require("../utils/time_format");
const Loger = require("../utils/loger");
const TokenAuth = require("../routes_middleware/token_auth");
const AdminAuth = require("../routes_middleware/admin_auth");
const AgentSchema = require("../schemas/agent_schema");
const UserSchema = require("../schemas/user_schema");

// ******** Agents **************

routes.post("/createAgent", TokenAuth, async (req, res) => {
  try {
    const agent = await NewAgent(req.body).save();
    res.json({ sucsses: true, msg: "new Agent Add" });
  } catch (err) {
    Loger.errlog("Error on createAgent");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "fail" });
  }
});
routes.get("/getAgent", AdminAuth, async (req, res) => {
  try {
    const allAgents = await AgentSchema.find();
    res.json({ sucsses: true, msg: "get All Agents", data: allAgents });
  } catch (err) {
    Loger.errlog("Error on getAgent");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "fail" });
  }
});

routes.put("/getAgentbyTeam", TokenAuth, async (req, res) => {
  try {
    const getTeam = await AgentSchema.find({ team: req.body.team }).select(
      "agent _id"
    );
    res.json({ sucsses: true, msg: "get Agents", data: getTeam });
  } catch (err) {
    Loger.errlog("Error on getAgentbyTeam");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "fail" });
  }
});

// **********  Users *************
// AdminAuth;
routes.post("/createUser", AdminAuth, async (req, res) => {
  try {
    const user = await NewUser(req.body).save();
    res.status(200).json({ sucsses: true, msg: "new user Creater" });
  } catch (err) {
    Loger.errlog("Error on createUser");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "fail" });
  }
});
//*        not in use mabe later  */
routes.get("/getUser", AdminAuth, async (req, res) => {
  UserSchema.find()
    .then(db_res => {
      res.json(db_res);
    })
    .catch(err => console.log(err));
});
routes.put("/getUsertbyID", AdminAuth, (req, res) => {
  UserSchema.find({ team: req.body.id })
    .then(db_res => {
      res.json(db_res);
    })
    .catch(err => console.log(err));
});

function NewAgent(paylode) {
  const { firstname, lastname, team, agent } = paylode;
  let newAgent = new AgentSchema({
    firstname: firstname,
    lastname: lastname,
    team: team,
    agent: agent,
    createdDate: FormattedDate.HumanDate()
  });
  return newAgent;
  /*  Exampel */
  // {
  //   "firstname" : "test",
  //   "lastname" : "test",
  //   "team" : "test",
  //   "agent" : "test"
  // }
}
function NewUser(paylode) {
  const { username, password, role, permission, team } = paylode;
  const NewUser = new UserSchema({
    username: username,
    password: password,
    role: role,
    permission: permission,
    team: team,
    createdDate: FormattedDate.HumanDate()
  });
  return NewUser;
  // --------- Exampel -----------
  // {
  //   "username" : "bot-admin",
  //    "password" : "Aa123456",
  //    "role" : "admin",
  //    "permission" : "5",
  //    "team" : "cool-team"
  //  }
}

module.exports = routes;
