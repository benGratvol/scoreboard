import React, { useState, useContext } from "react";

import NotificationsContext from "../../../context/notifications_context";

import inputVal from "../../../Utils/dataValedeter_util";
import Usefetch from "../../../Utils/networking";
import notfi from "../../../Utils/notifi_util";

const DefultState = { aff: "" };
export default prop => {
  const [, setMsg] = useContext(NotificationsContext);
  const [Aff, setAff] = useState(DefultState);

  const addAFF = async ev => {
    ev.preventDefault();

    const isEmpty = inputVal.notEmpty(Aff);
    if (!isEmpty.err) {
      const url = `/setings/addaff`;
      const token = prop.token;
      const backendRE = await Usefetch.useFetchPost(url, token, Aff);
      backendRE.sucsses
        ? setMsg(notfi.Sucsses(backendRE.msg))
        : setMsg(notfi.Fail(backendRE.msg));
      setAff(DefultState);
    } else {
      const msg = notfi.Warning(isEmpty.errMessage);
      setMsg(msg);
    }
  };
  const ValueChange = ev => {
    setAff({ ...Aff, [ev.target.name]: ev.target.value });
  };

  return (
    <div>
      <form onSubmit={addAFF}>
        <p>Add Affiliate</p>
        <input onChange={ValueChange} value={Aff.aff} name="aff" type="text" />
        <button>ADD</button>
      </form>
    </div>
  );
};
