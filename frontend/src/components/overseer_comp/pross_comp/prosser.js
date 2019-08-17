import React, { useState, useContext } from "react";

import Usefetch from "../../../Utils/networking";
import notifi from "../../../Utils/notifi_util";

import NotificationsContext from "../../../context/notifications_context";

const DefultState = { processors: "" };
export default () => {
  const [Pro, setPro] = useState(DefultState);
  const [msg, setMsg] = useContext(NotificationsContext);

  const addPro = async ev => {
    ev.preventDefault();
    const url = "/setings/addprosseor";
    const res = await Usefetch.useFetchPost(url, "", Pro);
    if (res.sucsses) {
      const msg = notifi.Sucsses(res.msg);
      setMsg(msg);
      setPro(DefultState);
    } else {
      const msg = notifi.Fail(res.msg);
      setMsg(msg);
    }
  };
  const ValueChange = ev => {
    setPro({ ...Pro, [ev.target.name]: ev.target.value });
  };

  return (
    <div>
      <form onSubmit={addPro}>
        <h3>Add Processor</h3>
        <input
          onChange={ValueChange}
          value={Pro.processors}
          name="processors"
          type="text"
        />
        <button>add processor</button>
      </form>
    </div>
  );
};
