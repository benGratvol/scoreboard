import React, { useState, useContext, useEffect } from "react";
import "./deposit.css";
// **************** context ********************
import UserContext from "../../context/user_context";
import NotificationsContext from "../../context/notifications_context";
// ************************* Utils *************
import network from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";
import inputVal from "../../Utils/dataValedeter_util";
// ************************* End Utils  *******

export default () => {
  const [val] = useContext(UserContext); // ---> use this
  const defultState = {
    agent: "",
    amount: "",
    currency: "",
    method: "",
    brand: "",
    team: val.user.team,
    processor: "",
    client_dor: "",
    cid: "",
    affiliate: ""
  };
  const [, setMsg] = useContext(NotificationsContext);
  const [Deposit, setDeposit] = useState(defultState);
  const [agents, setAgents] = useState([]);
  const [loding, setLoding] = useState(false);
  const [Prosseor, setProsseor] = useState([]);
  const [AFF, setAff] = useState([]);
  const [Brands, setBrands] = useState([]);

  const ValueChange = ev => {
    setDeposit({ ...Deposit, [ev.target.name]: ev.target.value });
  };
  const addDeposit = ev => {
    const valinput = inputVal.notEmpty(Deposit);
    setLoding(true);
    ev.preventDefault();
    if (!valinput.err) {
      const url = "/stats/addDeposit";
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: val.token
        },
        body: JSON.stringify(Deposit)
      })
        .then(res => res.json())
        .then(data => {
          setLoding(false);

          if (data.sucsses) {
            const msg = notfi.Sucsses(data.msg);
            setMsg(msg);
            setDeposit(defultState);
          } else {
            const msg = notfi.Fail(data.msg);
            setMsg(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const msg = notfi.Warning(valinput.errMessage);
      setMsg(msg);
      setLoding(false);
    }
  };
  // get Users Team
  useEffect(() => {
    setup();
  }, []);
  //----------    optimiz this
  const setup = async () => {
    const token = val.token;
    const Purl = "/setings/getprosseor";
    const Burl = "/setings/getbrands";
    const Aurl = "/setings/getaff";
    const Turl = "/users/getAgentbyTeam";
    const prosseor = await network.useFetchWithToken(Purl, token);
    const Aff = await network.useFetchWithToken(Aurl, token);
    const Brands = await network.useFetchWithToken(Burl, token);
    const Team = await network.useFetchPut(Turl, val.token, {
      team: val.user.team
    });
    setProsseor(prosseor.data);
    setAff(Aff.data);
    setAgents(Team.data);
    setBrands(Brands.data);
  };

  // *********************  end of  new 25/7/2019 ******************

  return (
    <div>
      <form className="deposit-wraper" onSubmit={addDeposit} disabled={loding}>
        <p className="devider">Agent</p>
        <select name="agent" value={Deposit.agent} onChange={ValueChange}>
          <option>Select a Agent</option>
          {agents.map(agent => {
            return (
              <option key={agent._id} value={agent.agent}>
                {agent.agent}
              </option>
            );
          })}
        </select>
        <br />

        <p className="devider">Brand</p>
        <select name="brand" value={Deposit.brand} onChange={ValueChange}>
          <option>Select a Brand</option>
          {Brands.map(brand => {
            return (
              <option key={brand._id} value={brand.brandname}>
                {brand.brandname}
              </option>
            );
          })}
        </select>
        <br />
        <p className="devider">Billing</p>
        <p>Amount</p>
        <input name="amount" value={Deposit.amount} onChange={ValueChange} />
        <p>Currency</p>
        <select name="currency" value={Deposit.currency} onChange={ValueChange}>
          <option value="">Currency</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
        </select>
        <p>Payment Method</p>
        <select name="method" value={Deposit.method} onChange={ValueChange}>
          <option value="">Method</option>
          <option value="CC">CC</option>
          <option value="Wire_Transfer">Wire Transfer</option>
          <option value="BTC">BTC</option>
        </select>
        <p>Processor</p>
        <select
          name="processor"
          value={Deposit.processor}
          onChange={ValueChange}
        >
          <option value="">Select Processor </option>
          {Prosseor.map(p => {
            return (
              <option key={p._id} value={p.processors}>
                {p.processors}
              </option>
            );
          })}
        </select>
        <br />
        <p className="devider">Affiliate</p>
        <select
          name="affiliate"
          value={Deposit.affiliate}
          onChange={ValueChange}
        >
          <option value="">Select Affiliate </option>
          {AFF.map(a => {
            return (
              <option key={a._id} value={a.affname}>
                {a.affname}
              </option>
            );
          })}
        </select>
        <br />
        <p className="devider">Client info</p>
        <p>Date of Registration</p>
        <input
          name="client_dor"
          type="date"
          value={Deposit.client_dor}
          onChange={ValueChange}
        />
        <b />
        <p>Clients CID</p>
        <b />
        <input
          name="cid"
          value={Deposit.cid}
          type="text"
          onChange={ValueChange}
        />
        <button disabled={loding}> {loding ? "Sending..." : "Deposit"} </button>
      </form>
    </div>
  );
};
