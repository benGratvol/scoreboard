import React, { useState, useMemo } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/login_cop/login";
import Main from "./components/main_comp/main";

import UserContext from "./context/user_context";

function App() {
  const [val, setVal] = useState(null);
  const providerVal = useMemo(() => [val, setVal], [val, setVal]);
  const shadow = true;
  return (
    <div className="App">
      <header className="" />
      {shadow ? (
        <body>
          <Router>
            <Switch>
              <UserContext.Provider value={providerVal}>
                {val ? (
                  <Route exact path="/" component={Main} />
                ) : (
                  <Route exact path="/" component={Login} />
                )}
              </UserContext.Provider>
            </Switch>
          </Router>
        </body>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
