import React from "react";

import "./nav.css";

import { Link } from "react-router-dom";
// nav bar css class navbar navbar-expand-lg navbar-light bg-light
export default prop => {
  console.log(prop);
  const { name, role } = prop.prop;
  return (
    <div className="nav-wraper">
      {/* <h4>
        Welcome {name} Role :{role}{" "}
      </h4> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <ul className="navbar-nav mr-auto">
          {role === "admin" || role === "team_manager" ? (
            <li>
              <Link to={"/main/Deposit"} className="nav-link">
                Add Deposit
              </Link>
            </li>
          ) : (
            <></>
          )}
          {role === "admin" || role === "team_manager" ? (
            <li>
              <Link to={"/main/Createagent"} className="nav-link">
                Create Agen
              </Link>
            </li>
          ) : (
            <></>
          )}

          <li>
            <Link to={"/main/Backoffice"} className="nav-link">
              Backoffice
            </Link>
          </li>

          {role === "admin" ? (
            <>
              <li>
                <Link to={"/main/Scoreboard"} className="nav-link">
                  Scoreboard
                </Link>
              </li>
              <li>
                <Link to={"/main/Edit"} className="nav-link">
                  Edit Deposit
                </Link>
              </li>
              <li>
                <Link to={"/main/Overseer"} className="nav-link">
                  Overseer
                </Link>
              </li>
            </>
          ) : (
            <div />
          )}
        </ul>
      </nav>
    </div>
  );
};
