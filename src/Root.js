import React from "react";
import App from "./App";
import Auth from "./Auth";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={() => <App />} />
        <Route path={"/auth"} component={() => <Auth />} />
      </Switch>
    </Router>
  );
}
