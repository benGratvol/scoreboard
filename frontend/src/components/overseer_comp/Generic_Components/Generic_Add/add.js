import React, { useState, useContext } from "react";

import NotificationsContext from "../../../../context/notifications_context";

import inputVal from "../../../../Utils/dataValedeter_util";
import Usefetch from "../../../../Utils/networking";
import notfi from "../../../../Utils/notifi_util";

const DefultState = { processors: "" };
export default prop => {
  const { Url, add } = prop;
  const [Pro, setPro] = useState(add);
  const [, setMsg] = useContext(NotificationsContext);

  const addPro = async ev => {
    ev.preventDefault();

    const isEmpty = inputVal.notEmpty(Pro);
    if (!isEmpty.err) {
      const url = Url;
      const token = prop.token;
      const backendRE = await Usefetch.useFetchPost(url, token, Pro);
      backendRE.sucsses
        ? setMsg(notfi.Sucsses(backendRE.msg))
        : setMsg(notfi.Fail(backendRE.msg));
      setPro(DefultState);
    } else {
      const msg = notfi.Warning(isEmpty.errMessage);
      setMsg(msg);
    }
  };
  const ValueChange = ev => {
    setPro({ ...Pro, [ev.target.name]: ev.target.value });
  };

  return (
    <div>
      <form onSubmit={addPro}>
        {/* <p>Add {}</p> */}
        <input
          onChange={ValueChange}
          value={Pro[Object.keys(Pro)]}
          name={Object.keys(Pro)}
          type="text"
        />
        <button>ADD</button>
      </form>
    </div>
  );
};
