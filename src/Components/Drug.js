import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { dbService } from "../fbase";
import { motion } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Drug = ({ todayDrugData }) => {
  const [dayOnOff, setDayOnOff] = useState(todayDrugData.day);
  const [nightOnOff, setNightOnOff] = useState(todayDrugData.night);
  const [sleepOnOff, setSleepOnOff] = useState(todayDrugData.sleep);
  const [dayTime, setDayTime] = useState(todayDrugData.whenEatDrugAtDay);
  const [nightTime, setNightTime] = useState(todayDrugData.whenEatDrugAtNight);
  const [sleepTime, setSleepTime] = useState(todayDrugData.whenEatDrugAtSleep);

  useEffect(() => {
    setDayOnOff(todayDrugData.day);
    setDayTime(todayDrugData.whenEatDrugAtDay);
    setNightOnOff(todayDrugData.night);
    setNightTime(todayDrugData.whenEatDrugAtNight);
    setSleepOnOff(todayDrugData.sleep);
    setSleepTime(todayDrugData.whenEatDrugAtSleep);
    console.log("실행");
  }, [
    todayDrugData.day,
    todayDrugData.night,
    todayDrugData.sleep,
    todayDrugData.whenEatDrugAtDay,
    todayDrugData.whenEatDrugAtNight,
    todayDrugData.whenEatDrugAtSleep,
  ]);
  // 현재시간을 기록하는데 필요
  const [stopwatchTime, setStopwatchTime] = useState(dayjs().format());

  const dayAndNightChange = async (e) => {
    setStopwatchTime(dayjs().format());
    if (e.target.name === "day") {
      const DayData = {
        day: !dayOnOff,
        whenEatDrugAtDay: !dayOnOff ? dayjs(stopwatchTime).format() : "",
      };
      if (dayOnOff) {
        let dayConfirm = window.confirm("약 기록을 지울게요.");
        if (!dayConfirm) return;
      }
      await dbService.doc(`드러그/${todayDrugData.id}`).update(DayData);
    } else if (e.target.name === "night") {
      const NightData = {
        night: !nightOnOff,
        whenEatDrugAtNight: !nightOnOff ? dayjs(stopwatchTime).format() : "",
      };
      if (nightOnOff) {
        let nightConfirm = window.confirm("약 기록을 지울게요.");
        if (!nightConfirm) return;
      }
      await dbService.doc(`드러그/${todayDrugData.id}`).update(NightData);
    } else if (e.target.name === "sleep") {
      const SleepData = {
        sleep: !sleepOnOff,
        whenEatDrugAtSleep: !sleepOnOff ? dayjs(stopwatchTime).format() : "",
      };
      if (sleepOnOff) {
        let sleepConfirm = window.confirm("약 기록을 지울게요.");
        if (!sleepConfirm) return;
      }
      await dbService.doc(`드러그/${todayDrugData.id}`).update(SleepData);
    }
  };

  return (
    <>
      <DrugDiv>
        <Header>약</Header>
        <ButtonDiv>
          <DayAndNightButton
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={dayAndNightChange}
            bgcolor="#3B82F6"
            name="day"
            opacity={dayOnOff ? "1" : "0.5"}
            fontSize={dayOnOff ? "20px" : "16px"}
          >
            <Icon
              src={require("../icons/sun.png")}
              imgwidth="33px"
              imgheight="33px"
              imgmargin={dayOnOff ? "0px 3px 0px 0px" : "0px"}
              name="day"
            />
            {dayOnOff &&
              `${dayjs(dayTime).format("HH:")}${dayjs(dayTime).format("mm")}`}
          </DayAndNightButton>
          <DayAndNightButton
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={dayAndNightChange}
            bgcolor={"#6366F1"}
            name="night"
            opacity={nightOnOff ? "1" : "0.5"}
            fontSize={nightOnOff ? "20px" : "19px"}
          >
            <Icon
              src={require("../icons/night-mode.png")}
              imgwidth="25px"
              imgheight="25px"
              imgmargin={nightOnOff ? "0px 6px 0px 0px" : "0px"}
              name="night"
            />
            {nightOnOff &&
              `${dayjs(nightTime).format("HH:")}${dayjs(nightTime).format(
                "mm"
              )}`}
          </DayAndNightButton>
          <DayAndNightButton
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={dayAndNightChange}
            bgcolor={"#30516E"}
            name="sleep"
            opacity={sleepOnOff ? "1" : "0.5"}
            fontSize={sleepOnOff ? "20px" : "16px"}
          >
            <Icon
              src={require("../icons/half-moon.png")}
              name="sleep"
              imgwidth="25px"
              imgheight="25px"
              imgmargin={sleepOnOff ? "0px 6px 0px 0px" : "0px"}
            />
            {sleepOnOff &&
              `${dayjs(sleepTime).format("HH:")}${dayjs(sleepTime).format(
                "mm"
              )}`}
          </DayAndNightButton>
        </ButtonDiv>
      </DrugDiv>
    </>
  );
};

const Header = styled.div`
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  font-size: 27px;
  text-align: left;
  width: 100%;
  color: #333d4b;
  margin-left: 0px;
  margin-bottom: 15px;
`;

const DrugDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 110px;
  max-width: 900px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DayAndNightButton = styled(motion.button)`
  font-family: "Pretendard-Regular";
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  width: 32%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.bgcolor};
  opacity: ${(props) => props.opacity};
  cursor: pointer;
  color: #ebf5ff;
  word-wrap: break-all;
  letter-spacing: 1px;
  font-weight: 900;
  font-size: 20px;
  text-align: left;
  transition: opacity 0.3s ease, width 0.3s ease;

  @media screen and (max-width: 768px) {
    width: 31%;
    font-size: 17px;
  }
`;

const Icon = styled(motion.img)`
  width: ${(props) => props.imgwidth};
  height: ${(props) => props.imgheight};
  padding: ${(props) => props.imgpadding};
  margin: ${(props) => props.imgmargin};
  transition: all 0.3s ease;
`;

const LoadingDrugDiv = styled.div`
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

export default Drug;