import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { dbService } from "../fbase";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import FeelingForm from "../Components/FeelingForm";
import FeelingList from "../Components/FeelingList";
import Drug from "../Components/Drug";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function Home() {
  // 전체 드러그, 필링 데이터 예정/////////////
  // => 전체 목록 보기 위해 필요

  // '오늘' 드러그, 필링 데이터 (배열)
  const [todayDrugData, setTodayDrugData] = useState([]);
  const [todayFeelingData, setTodayFeelingData] = useState([]);
  const [feelingloading, setFeelingLoading] = useState(false);

  // 드러그 데이터의 on off
  const [dayOnOff, setDayOnOff] = useState(false);
  const [nightOnOff, setNightOnOff] = useState(false);

  // 드러그 데이터의 기록 시간과 로딩
  const [dayTime, setDaytime] = useState("");
  const [nightTime, setNighttime] = useState("");
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
        // 모든 데이터 불러와
        let todayData = array.filter(
          (data) =>
            dayjs(data.time).format("YYYY-M-D") === dayjs().format("YYYY-M-D")
        );
        //오늘자의 데이터만 필터링하기
        setTodayFeelingData(todayData);
        setFeelingLoading(true);
      });

    dbService
      .collection(`드러그`)
      .orderBy("dateID")
      .onSnapshot((d) => {
        const array = d.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
      setDayOnOff(returnTodayData.day);
      setNightOnOff(returnTodayData.night);
      setDaytime(returnTodayData.whenEatDrugAtDay);
      setNighttime(returnTodayData.whenEatDrugAtNight);
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
      whenEatDrugAtDay: "",
      whenEatDrugAtNight: "",
    };

    await dbService.collection(`드러그`).add(drugData);
  };

  return (
    <Main>
      <Header />
      <FeelingForm />
      {drugloading ? (
        <Drug
          DrugData={todayDrugData}
          DayOnOff={dayOnOff}
          NightOnOff={nightOnOff}
          DayTime={dayTime}
          NightTime={nightTime}
          Drugloading={drugloading}
        />
      ) : (
        <LoadingDrug></LoadingDrug>
      )}
      <FeelingList todayFeelingData={todayFeelingData} />
    </Main>
  );
}

const Main = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;

  p {
    width: 100%;
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    text-align: left;
    font-weight: 500;
  }
`;

const LoadingDrug = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 900px;
  min-height: 101px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  padding-bottom: 29px;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

export default Home;
