import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { dbService, authService } from "./fbase";
import useInterval from "./hooks/useInterval";
import ProgressBar from "@ramonak/react-progress-bar";
import DrugInfo from "./DrugInfo";
import Feeling from "./Feeling";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function Home() {
  // 전체 드러그, 필링 데이터 예정/////////////
  // => 전체 목록 보기 위해 필요

  // '오늘' 드러그, 필링 데이터 (배열)
  const [todayDrugData, setTodayDrugData] = useState([]);
  const [todayFeelingData, setTodayFeelingData] = useState([]);

  // 드러그 데이터의 on off
  const [day, setDay] = useState(false);
  const [night, setNight] = useState(false);

  // 드러그 데이터의 기록 시간과 로딩
  const [dayTime, setDaytime] = useState("");
  const [nightTime, setNighttime] = useState("");
  const [drugloading, setDrugLoading] = useState(false);

  useEffect(() => {
    setDrugLoading(false);
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
    if (returnTodayData.length === 0) {
      // 오늘 약이 기록되지 않아 기본 데이터 생성
      drugInit();
    } else {
      // 오늘 기록된 약이 있으므로 기존 데이터 불러오기
      setTodayDrugData(returnTodayData);
      setDay(returnTodayData.day);
      setNight(returnTodayData.night);
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
      <Feeling />
      {drugloading ? (
        <DrugInfo
          DrugData={todayDrugData}
          drugloading={drugloading}
          Day={day}
          Night={night}
          DayTime={dayTime}
          NightTime={nightTime}
        />
      ) : (
        <AddBarDiv
          sibal="smooth"
          bgColor="white"
          style={{ marginBottom: "20px", paddingBottom: "29px" }}
        ></AddBarDiv>
      )}

      <AddBarDiv
        sibal="smooth"
        bgColor="white"
        style={{ alignItems: "flex-start" }}
      >
        <AddBarHeader>시간순</AddBarHeader>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {todayFeelingData.map((data, index) => (
            // 개별 컴포넌트
            <TodayFeelingList
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.2,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={require(`./icons/${data.feeling}.png`)}
                  width="30px"
                  style={{ marginRight: "10px" }}
                />
                <p>{data.text}</p>
              </div>
              <TodayFeelingListTime>
                {dayjs(data.time).format("HH시 mm분")}
              </TodayFeelingListTime>
            </TodayFeelingList>
          ))}
        </div>
      </AddBarDiv>
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

const AddBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 900px;
  min-height: 101px;
  background-color: ${(props) => props.bgColor};
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const AddBarHeader = styled.div`
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  width: 100%;
  color: #333d4b;
  font-size: 27px;

  margin-left: 0px;
  margin-bottom: 2px;
  text-align: left;
`;

const TodayFeelingList = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 13px 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  /* border-bottom: 0.6px solid rgb(214, 214, 214, 0.6); */

  p {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    font-weight: 900;
    font-size: 17px;
  }
`;

const TodayFeelingListTime = styled.div`
  text-align: center;
  min-width: 65px;
  background-color: #f2f4f6;
  border-radius: 10px;
  padding: 6px 6px;
  margin-left: 2px;
  font-weight: 800;
  font-size: 13px;
`;

const SideabarDiv = styled.div`
  width: 60%;
  min-height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const SidebarImg = styled(motion.img)``;

const SidebarEmojiBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  padding-right: 0.7px;
  padding-bottom: 8px;

  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  border-bottom: 3px solid ${(props) => props.borderColor};
`;

export default Home;
