import React, { useContext, useMemo, useState, lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Nav from "../nav_comp/nav";
import Notfound from "../notfound_comp/notfound";
import Deposit from "../deposit_comp/deposit";
import CreateAgent from "../createagent_comp/creatagent";
import Scoreboard from "../scoreBor_comp/scorebored";

//-------------- experimanteal -----------
import Backoffice from "../backoffice_comp/search bar_sub/searchbar";
import Notifications from "../notifications_comp/notifications";
import Overseer from "../overseer_comp/overseer";
import EdditDeposit from "../editdeposit_comp/edditdeposit";
//--------------  end ofexperimanteal -----------

import UserContext from "../../context/user_context";
import NotificationsContext from "../../context/notifications_context";

//----------------------------- layzey
const LazyDeposit = lazy(() => import("../deposit_comp/deposit"));
const LazyBackoffice = lazy(() =>
  import("../backoffice_comp/search bar_sub/searchbar")
);

//----------------------------- End layzey

export default () => {
  const [val] = useContext(UserContext); // ---> use this
  console.log(val);
  const [msg, setMsg] = useState({
    type: "Sucsses",
    body: `welcome ${val.user.username}`
  });
  const providerMsg = useMemo(() => [msg, setMsg], [msg, setMsg]);
  // permission: "5"
  // role: "admin"
  // team: "cool-team"
  // username: "bot-admin"

  // scor-cool-team
  // 123456
  return (
    <div>
      <Router>
        {/* <p>{JSON.stringify(val)}</p> */}
        <NotificationsContext.Provider value={providerMsg}>
          <Notifications />
          {val.user.role === "scoreboard" ? (
            <Scoreboard />
          ) : (
            <Nav prop={{ name: val.user.username, role: val.user.role }} />
          )}
          <br />
          <Switch>
            {val.user.role === "admin" ? (
              <>
                <Suspense fallback={<div>Loding...</div>}>
                  <Route exact path="/main/Deposit" component={LazyDeposit} />
                </Suspense>
                <Route exact path="/main/Createagent" component={CreateAgent} />
                <Route exact path="/main/Overseer" component={Overseer} />
                <Route exact path="/main/Scoreboard" component={Scoreboard} />
                <Route exact path="/main/Backoffice" component={Backoffice} />
                <Route exact path="/main/Edit" component={EdditDeposit}></Route>
              </>
            ) : val.user.role === "support" ? (
              <Suspense fallback={<div>Loding...</div>}>
                <Route
                  exact
                  path="/main/Backoffice"
                  component={LazyBackoffice}
                />
              </Suspense>
            ) : val.user.role === "team_manager" ? (
              <>
                <Route exact path="/main/Deposit" component={Deposit} />
                <Route exact path="/main/Createagent" component={CreateAgent} />
              </>
            ) : (
              <></>
            )}
            <Route exact path="/admin" component={Notfound} />
          </Switch>
        </NotificationsContext.Provider>
      </Router>
    </div>
  );
};
