import React, { useState, useContext } from "react";
import UserContext from "../../context/user_context";
import NotificationsContext from "../../context/notifications_context";

import Networking from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";

import "./edditdeposit.css";

export default () => {
  const [val] = useContext(UserContext); // ---> use this
  const [, setMsg] = useContext(NotificationsContext);

  const [eddDeposit, seteddDeposit] = useState([]);
  const [UpdateDeposit, setUpdateDeposit] = useState({});
  const [query, setQuery] = useState("");

  const getDeposit = async ev => {
    ev.preventDefault();
    const url = "/backoffice/searcheditdeposit";
    const jsObj = await Networking.useFetchPut(url, val.token, query);

    console.log(jsObj);
    seteddDeposit(jsObj.data);
  };
  const valChange = ev => {
    setQuery({ ...query, [ev.target.name]: ev.target.value });
  };
  const updatepaylode = ev => {
    setUpdateDeposit({ ...UpdateDeposit, [ev.target.name]: ev.target.value });
  };
  const sendpaylode = async ev => {
    ev.preventDefault();
    const paylode = {
      UpdateDeposit: UpdateDeposit,
      id: query
    };
    const url = "/backoffice/updatedeposit";
    const res = await Networking.useFetchPut(url, val.token, paylode);
    if (res.sucsses) {
      const msg = notfi.Sucsses(res.msg);
      setMsg(msg);
    }
  };

  return (
    <div className="editDeposit_wraper">
      <from>
        <input type="text" name={"_id"} onChange={valChange}></input>
        <button onClick={getDeposit}>serch</button>
      </from>
      <br></br>
      <br></br>
      <div className="eddit_wraper">
        {eddDeposit.map(val => {
          return (
            <div className="eddist_form">
              <h3>Eddit Depost</h3>

              <h3>agent</h3>
              <input
                name="agent"
                onChange={updatepaylode}
                placeholder={val.agent}
              ></input>
              <h3>team</h3>
              <input
                name="team"
                onChange={updatepaylode}
                placeholder={val.team}
              ></input>
              <h3>amount</h3>
              <input
                type="number"
                name="amount"
                onChange={updatepaylode}
                placeholder={val.amount}
              ></input>
              <h3>amount_in_usd</h3>
              <input
                type="number"
                name="amount_in_usd"
                onChange={updatepaylode}
                placeholder={val.amount_in_usd}
              ></input>
              <h3>brand</h3>
              <input onChange={updatepaylode} placeholder={val.brand}></input>
              <h3>depositDate</h3>
              <input
                name="depositDate"
                onChange={updatepaylode}
                placeholder={val.depositDate}
              ></input>
              <h3>affiliate</h3>
              <input
                name="affiliate"
                onChange={updatepaylode}
                placeholder={val.affiliate}
              ></input>
              <br></br>
              <button
                onClick={async ev => {
                  console.log(val._id);
                  ev.preventDefault();
                  const paylode = {
                    UpdateDeposit: UpdateDeposit,
                    id: val._id
                  };
                  const url = "/backoffice/updatedeposit";
                  const res = await Networking.useFetchPut(
                    url,
                    val.token,
                    paylode
                  );
                  if (res.sucsses) {
                    const msg = notfi.Sucsses(res.msg);
                    setMsg(msg);
                  }
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// -----------------examel res
// _id: "5d6bdce6046d5f1e84f06738"
// affiliate: "aff1"
// agent: "meeeee"
// amount: 1832
// amount_in_usd: 2017.121768
// brand: "coolBrands"
// cid: "123123"
// client_dor: "2019-09-16"
// currency: "EUR"
// depositDate: "09-01-2019"
// depositMonth: "09-2019" ​​​
// deposit_vertifi: "no"
//  docs_sent: "no_docs"
//  exchangeDate: "19 Jan 1970 5:22:29"
//  method: "BTC"
//  processor: "fastcash"
//  team: "cool-team"
