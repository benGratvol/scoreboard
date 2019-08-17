import React, { useState } from "react";

import "./createuser.css";

function checkinput() {}

export default () => {
  const [User, setUser] = useState({
    username: "",
    password: "",
    role: "",
    permission: "",
    team: ""
  });
  const [msg, setMsg] = useState("");
  const ValueChange = ev => {
    setUser({ ...User, [ev.target.name]: ev.target.value });
  };

  const addUser = ev => {
    ev.preventDefault();
    console.log(User);
    const url = "/users/createUser";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(User)
    })
      .then(res => res.json())
      .then(data => {
        data.sucsses ? setMsg(data.msg) : setMsg(data.msg);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className="user-wraper" onSubmit={addUser}>
        <h3>{msg}</h3>
        <p className="devider">Create Agent</p>
        <p>User Name</p>
        <input
          type="text"
          name="username"
          value={User.username}
          onChange={ValueChange}
        />
        <p>Password</p>
        <input
          type="text"
          name="password"
          value={User.password}
          onChange={ValueChange}
        />
        <p>Role</p>
        <select name="role" value={User.role} onChange={ValueChange}>
          <option value="">select Role</option>
          <option value="admin">Admin</option>
          <option value="team_manager">Team Manager</option>
          <option value="support">Support</option>
          <option value="scoreboard">Scoreboard</option>
        </select>
        <p />
        <p>Permission</p>
        <select
          name="permission"
          value={User.permission}
          onChange={ValueChange}
        >
          <option value="">select Permission</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p>Team</p>
        <input
          type="text"
          name="team"
          value={User.team}
          onChange={ValueChange}
        />

        <p />
        <button>Add User</button>
      </form>
    </div>
  );
};
