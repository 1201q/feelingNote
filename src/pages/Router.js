import React from "react";
import Home from ".//Home";
import Auth from ".//Auth";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

export default function Root({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        <>
          {isLoggedIn ? (
            <Route>
              <Home />
            </Route>
          ) : (
            <Route>
              <Auth />
            </Route>
          )}
        </>
      </Switch>
    </Router>
  );
}
