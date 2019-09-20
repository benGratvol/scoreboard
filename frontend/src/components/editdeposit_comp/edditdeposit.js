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
    seteddDeposit(jsObj.data);
  };
  const valChange = ev => {
    setQuery({ ...query, [ev.target.name]: ev.target.value });
  };
  const updatepaylode = ev => {
    setUpdateDeposit({ ...UpdateDeposit, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="editDeposit_wraper">
      <p>
        <from className="serch-form">
          <input type="text" name={"_id"} onChange={valChange}></input>
          <button type="submit" onClick={getDeposit}>
            Search
          </button>
        </from>
      </p>
      <div></div>
      <div className="tabil_wraper">
        <table>
          <thead>
            <tr>
              <th>agent</th>
              <th>team</th>
              <th>amount</th>
              <th>amount_in_usd</th>
              <th>brand</th>
              <th>depositDate</th>
              <th>affiliate</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {eddDeposit.map(dep => {
              return (
                <tr>
                  <td>
                    <input
                      name="agent"
                      onChange={updatepaylode}
                      placeholder={dep.agent}
                    />
                  </td>
                  <td>
                    <input
                      name="team"
                      onChange={updatepaylode}
                      placeholder={dep.team}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      onChange={updatepaylode}
                      placeholder={dep.amount}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount_in_usd"
                      onChange={updatepaylode}
                      placeholder={dep.amount_in_usd}
                    />
                  </td>
                  <td>
                    <input
                      name="brand"
                      onChange={updatepaylode}
                      placeholder={dep.brand}
                    />
                  </td>
                  <td>
                    <input
                      name="depositDate"
                      onChange={updatepaylode}
                      placeholder={dep.depositDate}
                    />
                  </td>
                  <td>
                    <input
                      name="affiliate"
                      onChange={updatepaylode}
                      placeholder={dep.affiliate}
                    />
                  </td>
                  <td>
                    <button
                      className="edditbutton"
                      onClick={async ev => {
                        ev.preventDefault();
                        const paylode = {
                          UpdateDeposit: UpdateDeposit,
                          id: dep._id
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
