import React, { useState, useContext } from "react";

import NotificationsContext from "../../../context/notifications_context";

import inputVal from "../../../Utils/dataValedeter_util";
import Usefetch from "../../../Utils/networking";
import notfi from "../../../Utils/notifi_util";

const defultState = {
  ip: ""
};

export default prop => {
  const [IP, setIp] = useState("");
  const [, setMsg] = useContext(NotificationsContext);

  const addIP = async ev => {
    ev.preventDefault();

    const isEmpty = inputVal.notEmpty(IP);
    if (!isEmpty.err) {
      const url = `/blacklist/addIP`;
      const token = prop.token;
      const backendRE = await Usefetch.useFetchPost(url, token, IP);
      backendRE.sucsses
        ? setMsg(notfi.Sucsses(backendRE.msg))
        : setMsg(notfi.Fail(backendRE.msg));
      setIp(defultState);
    } else {
      const msg = notfi.Warning(isEmpty.errMessage);
      setMsg(msg);
    }
  };
  const ValueChange = ev => {
    setIp({ ...IP, [ev.target.name]: ev.target.value });
  };
  return (
    <div>
      <form onSubmit={addIP}>
        <p>whitelis</p>
        <input onChange={ValueChange} name="ip" value={IP.ip} type="text" />
        <button>ADD</button>
      </form>
    </div>
  );
};
