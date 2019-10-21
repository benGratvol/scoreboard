import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/login_cop/login";
import Main from "./components/main_comp/main";

import UserContext from "./context/user_context";

function App() {
  const [val, setVal] = useState(null);
  const providerVal = useMemo(() => [val, setVal], [val, setVal]);
  const [ok, setok] = useState(false); //for set up change to true

  useEffect(() => {
    const url = "blacklist/checkip";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.sucsses) {
          setok(true);
        }
      });
  }, []);

  return (
    <div className="App">
      <header className="" />
      {ok ? (
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
