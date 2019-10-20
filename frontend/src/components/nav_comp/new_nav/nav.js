import React from "react";
import { Link } from "react-router-dom";

import "./nav.css";

export default prop => {
  const { role, name } = prop.prop;

  const openNav = ev => {
    ev.preventDefault();
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = ev => {
    ev.preventDefault();
    document.getElementById("mySidenav").style.width = "0";
  };

  return (
    <div className="Nav-wraper">
      <div id="mySidenav" className="sidenav">
        <h2 className="closebtn" onClick={closeNav}>
          &times;
        </h2>
        <h6>
          Welcome {name} Role :{role}{" "}
        </h6>
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

          {role === "admin" || role === "team_manager" ? (
            <li>
              <Link to={"/main/Edit"} className="nav-link">
                Edit Deposit
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
      </div>
      <p className="meue-button" onClick={openNav}>
        &#9776; Menu
      </p>
    </div>
  );
};
