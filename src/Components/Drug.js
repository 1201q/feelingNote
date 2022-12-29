import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { dbService } from "../fbase";
import { motion, AnimateSharedLayout } from "framer-motion";
import { Link, useHistory } from "react-router-dom";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Drug = ({ todayDrugData }) => {
  const [dayOnOff, setDayOnOff] = useState(todayDrugData.day);
  const [nightOnOff, setNightOnOff] = useState(todayDrugData.night);
  const [sleepOnOff, setSleepOnOff] = useState(todayDrugData.sleep);
  const [dayTime, setDayTime] = useState(todayDrugData.whenEatDrugAtday);
  const [nightTime, setNightTime] = useState(todayDrugData.whenEatDrugAtnight);
  const [sleepTime, setSleepTime] = useState(todayDrugData.whenEatDrugAtsleep);

  useEffect(() => {
    setDayOnOff(todayDrugData.day);
    setDayTime(todayDrugData.whenEatDrugAtday);
    setNightOnOff(todayDrugData.night);
    setNightTime(todayDrugData.whenEatDrugAtnight);
    setSleepOnOff(todayDrugData.sleep);
    setSleepTime(todayDrugData.whenEatDrugAtsleep);
  }, [
    todayDrugData.day,
    todayDrugData.night,
    todayDrugData.sleep,
    todayDrugData.whenEatDrugAtday,
    todayDrugData.whenEatDrugAtnight,
    todayDrugData.whenEatDrugAtsleep,
  ]);
  // 현재시간을 기록하는데 필요
  const [stopwatchTime, setStopwatchTime] = useState(dayjs().format());

  const dayAndNightChange = async (e) => {
    const { name } = e.target;
    setStopwatchTime(dayjs().format());

    if (name === "day") {
      const data = {
        day: !dayOnOff,
        whenEatDrugAtday: !dayOnOff ? dayjs(stopwatchTime).format() : "",
      };
      if (dayOnOff) {
        let dayConfirm = window.confirm("약 기록을 지울게요.");
        if (!dayConfirm) return;
      }
      await dbService.doc(`드러그/${todayDrugData.id}`).update(data);
    } else if (name === "night") {
      const data = {
        night: !nightOnOff,
        whenEatDrugAtnight: !nightOnOff ? dayjs(stopwatchTime).format() : "",
      };
      if (nightOnOff) {
        let nightConfirm = window.confirm("약 기록을 지울게요.");
        if (!nightConfirm) return;
      }
      await dbService.doc(`드러그/${todayDrugData.id}`).update(data);
    } else if (name === "sleep") {
      const data = {
        sleep: !sleepOnOff,
        whenEatDrugAtsleep: !sleepOnOff ? dayjs(stopwatchTime).format() : "",
      };
      if (sleepOnOff) {
        let sleepConfirm = window.confirm("약 기록을 지울게요.");
        if (!sleepConfirm) return;
      }
      await dbService.doc(`드러그/${todayDrugData.id}`).update(data);
    }
  };

  const history = useHistory();

  return (
    <DrugDiv layoutId="drug">
      <Header
        onClick={() => {
          history.push("/drug");
        }}
        whileHover={{ scale: 1.0, background: "white " }}
        whileTap={{
          scale: 0.98,
          background: "rgba(176,184,193, 0.1)",
        }}
        transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      >
        약
      </Header>
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
            `${dayjs(nightTime).format("HH:")}${dayjs(nightTime).format("mm")}`}
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
            `${dayjs(sleepTime).format("HH:")}${dayjs(sleepTime).format("mm")}`}
        </DayAndNightButton>
      </ButtonDiv>
    </DrugDiv>
  );
};

const Header = styled(motion.div)`
  /* &:hover {
    background-color: rgba(176, 184, 193, 0.3);
    border-radius: 10px;
    transition: all 0.3s;
  } */

  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  font-size: 27px;
  text-align: left;
  width: 100%;
  color: #333d4b;
  margin-left: 0px;
  padding-bottom: 4px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const DrugDiv = styled(motion.div)`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 104px;
  max-width: 900px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  cursor: pointer;

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
