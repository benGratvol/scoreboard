import React, { useState, useContext } from "react";
import UserContext from "../../context/user_context";

import "./login.css";

export default () => {
  const [, setval] = useContext(UserContext);
  const [userCerd, setuserCerd] = useState({
    username: "bot-admin",
    password: "Aa123456"
  });
  const login = ev => {
    ev.preventDefault();
    const url = "/login/auth";
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCerd)
    })
      .then(res => res.json())
      .then(data => {
        if (data.suscsses) {
          const user = data.user;
          const token = data.token;
          setval({ user: user, token: token });
        } else {
          setval(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const ValueChange = ev => {
    setuserCerd({ ...userCerd, [ev.target.name]: ev.target.value });
  };
  return (
    <div className="login-wraper">
      <form onSubmit={login}>
        <p>username</p>
        <input
          name="username"
          value={userCerd.username}
          onChange={ValueChange}
        />
        <p>password</p>
        <input
          type="password"
          name="password"
          value={userCerd.password}
          onChange={ValueChange}
        />
        <p />
        <button>Login</button>
        <p />
      </form>
    </div>
  );
};
