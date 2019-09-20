import React from "react";

const creatUserView = prop => {
  console.log(prop);
  //   const [User, ValueChange, addUser] = prop;
  return (
    <div>
      <form className="user-wraper">
        {/* <form className="user-wraper" onSubmit={addUser}> */}

        <p className="devider">Create User</p>
        <p>User Name</p>
        <input
          type="text"
          name="username"
          //   value={User.username}
          //   onChange={ValueChange}
        />
        <p>Password</p>
        <input
          type="text"
          name="password"
          //   value={User.password}
          //   onChange={ValueChange}
        />
        <p>Role</p>
        <select name="role">
          {/* <select name="role" value={User.role} onChange={ValueChange}> */}

          <option value="">select Role</option>
          <option value="admin">Admin</option>
          <option value="team_manager">Team Manager</option>
          <option value="support">Support</option>
          <option value="scoreboard">Scoreboard</option>
        </select>
        <br></br>
        <p>Permission</p>
        <select name="permission">
          <option value="">select Permission</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p>Team</p>
        <input type="text" name="team" />
        <br></br>
        <button>Add User</button>
      </form>
    </div>
  );
};

export default creatUserView;
