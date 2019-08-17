import React, { useState, useEffect, useContext } from "react";

import net from "../../../Utils/networking";

import UserContext from "../../../context/notifications_context";

import BackOfficeTabil from "./back_off_tabil";

const defultState = {};

export default () => {
  const [setings, setSetings] = useState([]);
  const [search_res, setSearch_res] = useState([]);
  const [query, setQuery] = useState(defultState);

  const [val] = useContext(UserContext); // ---> use this

  useEffect(() => {
    (async function run() {
      const url = "/backoffice/setup";
      const urldep = "/stats/getDeposits";

      const jsObj = await net.useFetch(url);
      const jsObjDep = await net.useFetch(urldep);
      setSearch_res(jsObjDep.data);
      setSetings(jsObj.data);
    })();
  }, []);

  const ValueChange = ev => {
    setQuery({ ...query, [ev.target.name]: ev.target.value });
  };
  const submitSearch = async ev => {
    ev.preventDefault();
    console.log(query);
    const url = "/backoffice/search";
    const jsObj = await net.useFetchPut(url, val.token, query);
    if (jsObj.sucsses) {
      setSearch_res(jsObj.data);
      setQuery(defultState);
    }
    console.log(jsObj);
  };

  return (
    <>
      <form className="search-form" onSubmit={submitSearch}>
        <label>From</label>
        <input type="date" name="from-date" onChange={ValueChange} />
        <label>To</label>
        <input type="date" name="to-date" onChange={ValueChange} />

        {setings.agent !== undefined ? (
          <select name="agent" value={query.agent} onChange={ValueChange}>
            <option>Select Agent</option>
            {setings.agent.map(t => (
              <option value={t}>{t}</option>
            ))}
          </select>
        ) : (
          <select>
            <option>Select Agent</option>
          </select>
        )}
        {setings.team !== undefined ? (
          <select name="team" value={query.team} onChange={ValueChange}>
            <option>Select Team</option>
            {setings.team.map(t => (
              <option value={t}>{t}</option>
            ))}
          </select>
        ) : (
          <select>
            <option>Select Team</option>
          </select>
        )}

        <select name="docs_sent" onChange={ValueChange}>
          <option>Docs out Come </option>
          <option value="sent_request">Sent Request</option>
          <option value="has_docs">Has Docs</option>
          <option value="no_docs">No Docs</option>
        </select>
        <select name="deposit_vertifi" onChange={ValueChange}>
          <option>Deposit Verifi </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="pending">Pending</option>
          <option value="chb">CHB</option>
        </select>
        <p className="search-right">
          <input
            className=" input-search"
            type="text"
            name="free-hand"
            onChange={ValueChange}
          />
          <button>Search</button>
        </p>
      </form>
      <BackOfficeTabil prop={{ search_res: search_res }} />
    </>
  );
};
