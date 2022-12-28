import React from "react";
import Home from ".//Home";
import Auth from ".//Auth";
import Druginfo from ".//Druginfo";
import Header from "../Components/Header";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import dayjs from "dayjs";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export default function Root({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        <>
          {isLoggedIn ? (
            <Container>
              <Header />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/drug">
                <Druginfo />
              </Route>
            </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
