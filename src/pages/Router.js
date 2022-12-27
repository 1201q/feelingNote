import React, { useEffect, useState } from "react";
import Home from ".//Home";
import Auth from ".//Auth";
import Druginfo from ".//Druginfo";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

// home
import dayjs from "dayjs";
import { dbService } from "../fbase";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import FeelingForm from "../Components/FeelingForm";
import FeelingList from "../Components/FeelingList";
import Drug from "../Components/Drug";

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
              <Route path="/drug">
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
