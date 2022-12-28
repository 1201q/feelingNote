import React, { useEffect, useState } from "react";
import Home from ".//Home";
import Auth from ".//Auth";
import Druginfo from ".//Druginfo";
import Header from "../Components/Header";
import { dbService } from "../fbase";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import dayjs from "dayjs";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export default function Root({ isLoggedIn }) {
  const [allDrugData, setAllDrugData] = useState([]);
  const [allFeelingData, setAllFeelingData] = useState([]);
  // '오늘' 드러그, 필링 데이터 (배열)
  const [todayDrugData, setTodayDrugData] = useState([]);
  const [todayFeelingData, setTodayFeelingData] = useState([]);
  const [feelingloading, setFeelingLoading] = useState(false);
  const [drugloading, setDrugLoading] = useState(false);

  useEffect(() => {
    setDrugLoading(false);
    setFeelingLoading(false);
    dbService
      .collection(`테스트`)
      .orderBy("time")
      .onSnapshot((s) => {
        const array = s.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllFeelingData(array);
        // 모든 데이터 불러와
        let todayData = array.filter(
          (data) =>
            dayjs(data.time).format("YYYY-M-D") === dayjs().format("YYYY-M-D")
        );
        //오늘자의 데이터만 필터링하기
        setTodayFeelingData(todayData);
        setFeelingLoading(true);
      });
  }, []);

  useEffect(() => {
    dbService
      .collection(`드러그`)
      .orderBy("dateID")
      .onSnapshot((d) => {
        const array = d.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(array);
        // 드러그 데이터의 중복 생성 방지
        returnTodayrDrugData(array);
      });
  }, []);

  const returnTodayrDrugData = (array) => {
    // 오늘자의 드러그 데이터만 필터링 반환
    let returnTodayData = array.filter(
      (item) => item.dateID === dayjs().format("YYYY-M-D")
    )[0];
    if (!returnTodayData) {
      // 오늘 약이 기록되지 않아 기본 데이터 생성
      drugInit();
    } else {
      // 오늘 기록된 약이 있으므로 기존 데이터 불러오기
      setTodayDrugData(returnTodayData);
      setAllDrugData(array);
      setDrugLoading(true); // true 로딩끝
    }
  };

  const drugInit = async () => {
    // 오늘 드러그 데이터가 없으므로 최초 생성
    // 중복 방지를 위해 필요

    const drugData = {
      dateID: dayjs().format("YYYY-M-D"),
      day: false,
      night: false,
      sleep: false,
      whenEatDrugAtday: "",
      whenEatDrugAtnight: "",
      whenEatDrugAtsleep: "",
    };

    await dbService.collection(`드러그`).add(drugData);
  };

  return (
    <AnimatePresence>
      <Router>
        <Switch>
          <>
            {isLoggedIn ? (
              <Container>
                <Header />
                <Route exact path="/">
                  {drugloading && (
                    <Home
                      allDrugData={allDrugData}
                      allFeelingData={allFeelingData}
                      todayDrugData={todayDrugData}
                      todayFeelingData={todayFeelingData}
                      drugloading={drugloading}
                    />
                  )}
                </Route>
                <Route exact path="/drug">
                  <Druginfo
                    todayDrugData={todayDrugData}
                    drugloading={drugloading}
                  />
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
    </AnimatePresence>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;