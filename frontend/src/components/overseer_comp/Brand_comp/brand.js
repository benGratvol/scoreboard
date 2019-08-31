import React, { useState, useContext } from "react";

import NotificationsContext from "../../../context/notifications_context";

import inputVal from "../../../Utils/dataValedeter_util";
import Usefetch from "../../../Utils/networking";
import notfi from "../../../Utils/notifi_util";

const DefultState = { brandname: "" };
export default prop => {
  const [msg, setMsg] = useContext(NotificationsContext);
  const [Brand, setBrand] = useState(DefultState);

  const addBrand = async ev => {
    ev.preventDefault();

    const isEmpty = inputVal.notEmpty(Brand);
    if (!isEmpty.err) {
      const url = `/setings/addbrand`;
      const token = prop.token;
      const backendRE = await Usefetch.useFetchPost(url, token, Brand);
      backendRE.sucsses
        ? setMsg(notfi.Sucsses(backendRE.msg))
        : setMsg(notfi.Fail(backendRE.msg));
      setBrand(DefultState);
    } else {
      const msg = notfi.Warning(isEmpty.errMessage);
      setMsg(msg);
    }
  };
  const ValueChange = ev => {
    setBrand({ ...Brand, [ev.target.name]: ev.target.value });
  };

  return (
    <div>
      <form onSubmit={addBrand}>
        <p>Add Brand</p>
        <input
          onChange={ValueChange}
          value={Brand.brandname}
          name="brandname"
          type="text"
        />
        <button>ADD</button>
      </form>
    </div>
  );
};
