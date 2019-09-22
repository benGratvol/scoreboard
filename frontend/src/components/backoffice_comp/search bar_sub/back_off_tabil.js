import React, { useState, useEffect, useContext } from "react";

// -------------- utils --------------
import network from "../../../Utils/networking";
import notfi from "../../../Utils/notifi_util";
//
import Notifications from "../../../context/notifications_context";

import DocSum from "./sum_subcpm/docsum/docsum";
import VerSum from "./sum_subcpm/verifisum/verifisum";

import "./back_off_tabil.css";

export default props => {
  const [, setMsg] = useContext(Notifications);
  const [depRes, setDepRes] = useState([]);
  const [update, setUpdaet] = useState({});
  const [role] = useState(props.prop.role);
  const [token] = useState(props.prop.token);

  useEffect(() => {
    setDepRes(props.prop.search_res);
  }, [props.prop.search_res]);

  const valChange = ev => {
    ev.preventDefault();
    setUpdaet({ ...update, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="backoffice-wraper">
      <div className="sumcomp_wraper">
        <DocSum />
        <VerSum />
      </div>

      <br />
      <div className="tabil_div">
        <table style={{ backgroundColor: "gray" }}>
          <thead>
            <tr>
              <th>Deposit Date</th>
              <th>Registration Date</th>
              <th>CID</th>
              <th>Agent</th>
              <th>Brand</th>
              <th>Team</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>In Usd</th>
              <th>Method</th>
              <th>Processor</th>
              <th>Verifi</th>
              <th>Docs Sent</th>
              <th>Affiliate</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {depRes.map(client => {
              return (
                <tr style={{ backgroundColor: `#D3D3D3` }} key={client._id}>
                  <td>{client.depositDate}</td>
                  <td>{client.client_dor}</td>
                  <td>{client.cid}</td>
                  <td>{client.agent}</td>
                  <td>{client.brand}</td>
                  <td>{client.team}</td>
                  <td>{client.amount}</td>
                  <td>{client.currency}</td>
                  <td>{client.amount_in_usd.toFixed(2)}</td>
                  <td>{client.method}</td>
                  <td>{client.processor}</td>
                  <td>
                    {role === "team_manager" ? (
                      client.deposit_vertifi
                    ) : (
                      <select name="deposit_vertifi" onChange={valChange}>
                        <option>{client.deposit_vertifi} </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="pending">Pending</option>
                        <option value="chb">CHB</option>
                      </select>
                    )}
                  </td>
                  <td>
                    {role === "team_manager" ? (
                      client.docs_sent
                    ) : (
                      <select name="docs_sent" onChange={valChange}>
                        <option>{client.docs_sent}</option>
                        <option value="sent_request">Sent Request</option>
                        <option value="has_docs">Has Docs</option>
                        <option value="no_docs">No Docs</option>
                      </select>
                    )}
                  </td>
                  <td>{client.affiliate}</td>
                  <td>
                    {role === "team_manager" ? (
                      <></>
                    ) : (
                      <button
                        onClick={async () => {
                          const url = "/backoffice/update";
                          const paylode = {
                            _id: client._id,
                            update: update
                          };
                          // need to add  keey
                          const res = await network.useFetchPut(
                            url,
                            token,
                            paylode
                          );
                          if (res.sucsses) {
                            const msg = notfi.Sucsses(res.msg);
                            setMsg(msg);
                          } else {
                            const msg = notfi.Fail(res.msg);
                            setMsg(msg);
                          }
                          setUpdaet({});
                        }}
                      >
                        Save
                      </button>
                    )}
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
