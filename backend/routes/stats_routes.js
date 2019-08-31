const express = require("express");
const fetch = require("node-fetch");
const routes = express.Router();

const TokenAuth = require("../routes_middleware/token_auth");

const DepositSchema = require("../schemas/deposit_schema");
const Dateformat = require("../utils/time_format");

routes.post("/addDeposit", TokenAuth, (req, res) => {
  const {
    amount,
    currency,
    method,
    agent,
    brand,
    team,
    processor,
    client_dor,
    cid,
    affiliate
  } = req.body;
  const url = `https://www.freeforexapi.com/api/live?pairs=${currency}USD`;
  fetch(url)
    .then(res => res.json())
    .then(forXObj => {
      console.log(`[*] forx convert api [*]`);
      const rates = getMapKeyValue(forXObj.rates, `${currency}USD`);
      const DepositObj = {
        amount: amount,
        currency: currency,
        method: method,
        amount_in_usd: rates.value.rate * parseInt(amount),
        agent: agent,
        brand: brand,
        team: team,
        processor: processor,
        client_dor: client_dor,
        cid: cid,
        affiliate: affiliate,
        exchangeDate: Dateformat.timeConverter(rates.value.timestamp),
        depositDate: Dateformat.HumanDate(),
        depositMonth: Dateformat.GetMonth()
      };
      newDeposit(DepositObj)
        .save()
        .then(() => {
          console.log(`[*] New Deposit Created - by : ${agent} [*] `);
          res.json({ sucsses: true, msg: "add new Deposit " });
        })
        .catch(err => {
          console.log(`[-] Error in new Deposit [-]\n`);
          console.log(err);
        });
    });
});
routes.get("/getTeamDeposits/:team", (req, res) => {
  const team = req.params.team;
  DepositSchema.find({ depositMonth: Dateformat.GetMonth(), team: team })
    .select("amount_in_usd agent _id depositMonth depositDate")
    .then(db_res => {
      const DaleyDeposit = db_res.filter(
        val => val.depositDate == Dateformat.HumanDate()
      );
      res.json({
        sucsses: true,
        data: {
          monthly: getAllDeposits(db_res).sort((a, b) =>
            a.total < b.total ? 1 : b.total < a.total ? -1 : 0
          ),
          daily: getAllDeposits(DaleyDeposit).sort((a, b) =>
            a.total < b.total ? 1 : b.total < a.total ? -1 : 0
          ),
          lastDep: db_res[db_res.length - 1]
        }
      });
    })
    .catch(err => {
      console.log(`[-] Error in get Team [-]\n`);
      console.log(err);
    });
});

routes.get("/getDeposits", (req, res) => {
  DepositSchema.find()
    .then(db_res => {
      res.json({ sucsses: true, msg: "Get All Dep", data: db_res });
    })
    .catch(err => {
      console.log(`[-] Error in get Deposit [-]\n`);
      console.log(err);
    });
});
function newDeposit(paylode) {
  const {
    amount,
    currency,
    method,
    amount_in_usd,
    agent,
    brand,
    team,
    processor,
    client_dor,
    cid,
    affiliate,
    exchangeDate,
    depositDate,
    depositMonth
  } = paylode;
  const newdeposit = new DepositSchema({
    amount: amount,
    currency: currency,
    method: method,
    amount_in_usd: amount_in_usd,
    agent: agent,
    brand: brand,
    team: team,
    processor: processor,
    client_dor: client_dor,
    cid: cid,
    affiliate: affiliate,
    deposit_vertifi: "no",
    docs_sent: "no_docs",
    exchangeDate: exchangeDate,
    depositDate: depositDate,
    depositMonth: depositMonth
  });
  return newdeposit;
  /* ----------- exapel of ----------- 
  {
  
    "amount": 500,
    "currency": "USD",
    "method": "CC",
    "agent": "agent2",
    "team": "coolteam"
  
  }
*/
}

//**** PRIVET fUNCSHONS */
function SumAgentsDeposits(Dep, byname) {
  return Dep.filter(agent => {
    return agent.agent == byname;
  }).reduce((acc, cur) => {
    return acc + cur.amount_in_usd;
  }, 0);
}
// *********************
function getAllDeposits(data) {
  let totalDep = [];
  const unique = [...new Set(data.map(a => a.agent))];
  unique.forEach(agentName => {
    let count = data.filter(val => val.agent == agentName);
    let total = SumAgentsDeposits(data, agentName);
    totalDep.push({
      agent: agentName,
      total: parseInt(total.toFixed(3)),
      count: count.length
    });
  });
  return asending(totalDep);
}
function asending(arr) {
  return arr.sort((a, b) => {
    return a.total > b.total ? 1 : b.total < a.total ? -1 : 0;
  });
}

function getMapKeyValue(obj, key) {
  if (obj.hasOwnProperty(key)) return { key: key, value: obj[key] };
  throw new Error("Invalid map key.");
}

module.exports = routes;
