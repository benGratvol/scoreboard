import React, { useState, useContext } from "react";
import "./creatagent.css";
import UserContext from "../../context/user_context";

export default () => {
  const [val] = useContext(UserContext); // ---> use this

  const [Agent, setAgent] = useState({
    agent: "",
    firstname: "",
    lastname: "",
    team: val.user.team
  });

  const [msg, setMsg] = useState("");
  const ValueChange = ev => {
    setAgent({ ...Agent, [ev.target.name]: ev.target.value });
  };
  const addAgent = ev => {
    ev.preventDefault();
    console.log(Agent);
    const url = "/users/createAgent";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: val.token
      },
      body: JSON.stringify({ Agent })
    })
      .then(res => res.json())
      .then(data => {
        data.sucsses ? setMsg(data.msg) : setMsg(data.msg);
        setAgent("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="agent-wraper" onSubmit={addAgent}>
        <p className="devider">Create Agent</p>
        <h3>{msg}</h3>
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
