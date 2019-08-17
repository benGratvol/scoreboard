import React, { useState, useMemo } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/login_cop/login";
import Main from "./components/main_comp/main";

import UserContext from "./context/user_context";

function App() {
  const [val, setVal] = useState(null);
  // const providerVal = useMemo(() => { val, setVal }, [val, setVal]);
  const providerVal = useMemo(() => [val, setVal], [val, setVal]);

  return (
    <div className="App">
      <header className="" />
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
    </div>
  );

  // ****************  Old *****************
  // return (
  //   <div className="App">
  //     <header className="" />
  //     <Router>
  //       <Switch>
  //         <Route exact path="/" component={Login} />
  //         <Route exact path="/main" component={Main} />
  //         <Route exact path="/scoreboard" component={Scoreboard} />
  //         <Route exact path="/deposit" component={Deposit} />
  //         <Route exact path="/creatUser" component={CreatUser} />
  //         <Route component={Notfound} />
  //       </Switch>
  //     </Router>
  //   </div>
  // );
}

export default App;
