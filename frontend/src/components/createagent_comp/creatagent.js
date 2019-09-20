import React, { useState, useContext } from "react";
import "./creatagent.css";
import UserContext from "../../context/user_context";
import NotifContxt from "../../context/notifications_context";

import inputVal from "../../Utils/dataValedeter_util";
import Networking from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";

export default () => {
  const [val] = useContext(UserContext); // ---> use this
  const [, setMsg] = useContext(NotifContxt);
  const defultState = {
    agent: "",
    firstname: "",
    lastname: "",
    team: val.user.team
  };
  const [Agent, setAgent] = useState(defultState);

  const ValueChange = ev => {
    setAgent({ ...Agent, [ev.target.name]: ev.target.value });
  };
  const addAgent = async ev => {
    ev.preventDefault();
    const isEmpty = inputVal.notEmpty(Agent);
    if (!isEmpty.err) {
      const url = `/users/createAgent`;
      const token = val.token;
      const backendRE = await Networking.useFetchPost(url, token, Agent);
      backendRE.sucsses
        ? setMsg(notfi.Sucsses(backendRE.msg))
        : setMsg(notfi.Fail(backendRE.msg));
      setAgent(defultState);
    } else {
      const msg = notfi.Warning(isEmpty.errMessage);
      setMsg(msg);
    }
  };

  return (
    <div>
      <form className="agent-wraper" onSubmit={addAgent}>
        <p className="devider">Create Agent</p>
        <p>Agent Name</p>
        <input name="agent" value={Agent.agent} onChange={ValueChange} />
        <p>First Name</p>
        <input
          name="firstname"
          value={Agent.firstname}
          onChange={ValueChange}
        />
        <p>Last Name</p>
        <input name="lastname" value={Agent.lastname} onChange={ValueChange} />
        <p />
        <button>Add Agent</button>
      </form>
    </div>
  );
};
