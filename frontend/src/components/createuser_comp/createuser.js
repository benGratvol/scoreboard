import React, { useState, useContext } from "react";

import "./createuser.css";

import NotifContxt from "../../context/notifications_context";
import UserContext from "../../context/user_context";

import inputVal from "../../Utils/dataValedeter_util";
import Networking from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";

export default () => {
  const Deffultstate = {
    username: "",
    password: "",
    role: "",
    permission: "",
    team: ""
  };
  const [val] = useContext(UserContext);
  const [, setMsg] = useContext(NotifContxt);

  const [User, setUser] = useState(Deffultstate);
  const ValueChange = ev => {
    setUser({ ...User, [ev.target.name]: ev.target.value });
  };

  const addUser = async ev => {
    ev.preventDefault();
    const isEmpty = inputVal.notEmpty(User);
    if (!isEmpty.err) {
      const url = `/users/createUser`;
      const token = val.token;
      const backendRE = await Networking.useFetchPost(url, token, User);
      backendRE.sucsses
        ? setMsg(notfi.Sucsses(backendRE.msg))
        : setMsg(notfi.Fail(backendRE.msg));
      setUser(Deffultstate);
    } else {
      const msg = notfi.Warning(isEmpty.errMessage);
      setMsg(msg);
    }
  };

  return (
    <div>
      {/*--------------------------- proto type ---------------- */}
      {/* <CreatUser_View user={User} ValueChange={ValueChange} addUser={addUser} /> */}
      {/*--------------------------- end proto type ---------------- */}
      <form className="user-wraper" onSubmit={addUser}>
        <p className="devider">Create User</p>
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
        <br></br>
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
        <br></br>
        <button>Add User</button>
      </form>
    </div>
  );
};
