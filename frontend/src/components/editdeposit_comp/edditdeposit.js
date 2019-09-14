import React, { useState, useContext } from "react";
import UserContext from "../../context/user_context";
import NotificationsContext from "../../context/notifications_context";

import Networking from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";

export default () => {
  const [val] = useContext(UserContext); // ---> use this
  const [msg, setMsg] = useContext(NotificationsContext);
  const [eddDeposit, seteddDeposit] = useState([]);
  const [UpdateDeposit, setUpdateDeposit] = useState({});
  const [query, setQuery] = useState("");

  const getDeposit = async ev => {
    ev.preventDefault();
    const url = "/backoffice/search";
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
    const paylode = UpdateDeposit;
    const url = "/backoffice/updatedeposit";
    const res = await Networking.useFetchPut(url, val.token, paylode);
    if (res.sucsses) {
      const msg = notfi.Sucsses(res.msg);
      setMsg(msg);
    }
  };

  return (
    <div>
      <h3>Eddit Depost</h3>
      <from>
        <input type="text" name={"_id"} onChange={valChange}></input>
        <button onClick={getDeposit}>serch</button>
        <br></br>
        {eddDeposit.map(val => {
          return (
            <div>
              <h3>affiliate</h3>
              <input
                name="affiliate"
                onChange={updatepaylode}
                placeholder={val.affiliate}
              ></input>
              <h3>agent</h3>
              <input
                name="agent"
                onChange={updatepaylode}
                placeholder={val.agent}
              ></input>
              <h3>amount</h3>
              <input
                name="amount"
                onChange={updatepaylode}
                placeholder={val.amount}
              ></input>
              <h3>brand</h3>
              <input onChange={updatepaylode} placeholder={val.brand}></input>
              <h3>date</h3>
              <input
                onChange={updatepaylode}
                placeholder={val.depositDate}
              ></input>
              <br></br>
              <button onClick={sendpaylode}>Update</button>
            </div>
          );
        })}
      </from>
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
