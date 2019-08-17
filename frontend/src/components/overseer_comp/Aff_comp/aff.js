import React, { useState, useContext } from "react";

import Usefetch from "../../../Utils/networking";
import notifi from "../../../Utils/notifi_util";

import NotificationsContext from "../../../context/notifications_context";

const DefultState = { aff: "" };
export default () => {
  const [Aff, setAff] = useState(DefultState);
  const [msg, setMsg] = useContext(NotificationsContext);

  const addAFF = async ev => {
    ev.preventDefault();
    const url = "/setings/addaff";
    const res = await Usefetch.useFetchPost(url, "", Aff);
    if (res.sucsses) {
      const msg = notifi.Sucsses(res.msg);
      setMsg(msg);
      setAff(DefultState);
    } else {
      const msg = notifi.Fail(res.msg);
      setMsg(msg);
    }
  };
  const ValueChange = ev => {
    setAff({ ...Aff, [ev.target.name]: ev.target.value });
  };

  return (
    <div>
      <form onSubmit={addAFF}>
        <h3>Add Affiliate</h3>
        <input onChange={ValueChange} value={Aff.aff} name="aff" type="text" />
        <button>add Aff</button>
      </form>
    </div>
  );
};
