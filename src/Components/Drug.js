import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { dbService } from "../fbase";
import { motion } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Drug = ({
  DrugData,
  DayOnOff,
  NightOnOff,
  SleepOnOff,
  DayTime,
  NightTime,
  SleepTime,
  Drugloading,
}) => {
  // 약 기록 시작 => 데이, 나이트 버튼 출력

  // 현재시간을 기록하는데 필요
  const [stopwatchTime, setStopwatchTime] = useState(dayjs().format());

  // button on off{}
  const [dayBtn, setDayBtn] = useState(DayOnOff);
  const [nightBtn, setNightBtn] = useState(NightOnOff);
  const [sleepBtn, setSleepBtn] = useState(SleepOnOff);

  // 로딩
  const [drugloading, setDrugLoading] = useState(Drugloading);

  const dayAndNightBtnClick = (e) => {
    let dayOnOff = false;
    let nightOnOff = false;
    let sleepOnOff = false;
    if (e.target.name === "day") {
      if (dayBtn === true) {
        dayOnOff = !window.confirm("약 기록을 지울게요.");
      }
      if (dayOnOff === false) {
        dayAndNightChange(e);
      }
    } else if (e.target.name === "night") {
      if (nightBtn === true) {
        nightOnOff = !window.confirm("약 기록을 지울게요.");
      }
      if (nightOnOff === false) {
        dayAndNightChange(e);
      }
    } else if (e.target.name === "sleep") {
      if (sleepBtn === true) {
        sleepOnOff = !window.confirm("약 기록을 지울게요.");
      }
      if (sleepOnOff === false) {
        dayAndNightChange(e);
      }
    }
  };

  const dayAndNightChange = async (e) => {
    setStopwatchTime(dayjs().format());
    if (e.target.name === "day") {
      setDayBtn(!dayBtn);
      if (dayBtn === false) {
        await dbService.doc(`드러그/${DrugData.id}`).update({
          day: true,
          whenEatDrugAtDay: dayjs(stopwatchTime).format(),
        });

        // 기록
      } else {
        await dbService.doc(`드러그/${DrugData.id}`).update({
          day: false,
          whenEatDrugAtDay: "",
        });
        // 삭제
      }
    } else if (e.target.name === "night") {
      setNightBtn(!nightBtn);
      if (nightBtn === false) {
        await dbService.doc(`드러그/${DrugData.id}`).update({
          night: true,
          whenEatDrugAtNight: dayjs(stopwatchTime).format(),
        });
        // 기록
      } else {
        await dbService.doc(`드러그/${DrugData.id}`).update({
          night: false,
          whenEatDrugAtNight: "",
        });
        // 삭제
      }
    } else if (e.target.name === "sleep") {
      setSleepBtn(!sleepBtn);
      if (sleepBtn === false) {
        await dbService.doc(`드러그/${DrugData.id}`).update({
          sleep: true,
          whenEatDrugAtSleep: dayjs(stopwatchTime).format(),
        });
        // 기록
      } else {
        await dbService.doc(`드러그/${DrugData.id}`).update({
          sleep: false,
          whenEatDrugAtSleep: "",
        });
        // 삭제
      }
    }
  };
  return (
    <>
      {drugloading ? (
        <DrugDiv>
          <Header>약</Header>
          <ButtonDiv>
            <DayAndNightButton
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={dayAndNightBtnClick}
              bgcolor="#3B82F6"
              btnwidth={DayOnOff ? "18%" : "37%"}
              name="day"
              opacity={DayOnOff ? "1" : "0.5"}
              fontSize={DayOnOff ? "20px" : "16px"}
            >
              <Icon
                src={require("../icons/sun.png")}
                imgwidth="33px"
                imgheight="33px"
                imgmargin={DayOnOff ? "0px 3px 0px 0px" : "0px"}
                name="day"
              />
              {DayOnOff
                ? `${dayjs(DayTime).format("HH:")}${dayjs(DayTime).format(
                    "mm"
                  )}`
                : ``}
            </DayAndNightButton>
            <DayAndNightButton
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={dayAndNightBtnClick}
              bgcolor={"#6366F1"}
              btnwidth={NightOnOff && !DayOnOff ? "18%" : "37%"}
              name="night"
              opacity={NightOnOff ? "1" : "0.5"}
              fontSize={NightOnOff ? "20px" : "19px"}
            >
              <Icon
                src={require("../icons/night-mode.png")}
                imgwidth="25px"
                imgheight="25px"
                imgmargin={NightOnOff ? "0px 6px 0px 0px" : "0px"}
                name="night"
              />

              {NightOnOff
                ? `${dayjs(NightTime).format("HH:")}${dayjs(NightTime).format(
                    "mm"
                  )}`
                : ``}
            </DayAndNightButton>
            <DayAndNightButton
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={dayAndNightBtnClick}
              bgcolor={"#30516E"}
              btnwidth={DayOnOff || (!DayOnOff && NightOnOff) ? "37%" : "18%"}
              name="sleep"
              opacity={SleepOnOff ? "1" : "0.5"}
              fontSize={SleepOnOff ? "20px" : "16px"}
            >
              <Icon
                src={require("../icons/half-moon.png")}
                name="sleep"
                imgwidth="25px"
                imgheight="25px"
                imgmargin={SleepOnOff ? "0px 6px 0px 0px" : "0px"}
              />
              {SleepOnOff
                ? `${dayjs(SleepTime).format("HH:")}${dayjs(SleepTime).format(
                    "mm"
                  )}`
                : ``}
            </DayAndNightButton>
          </ButtonDiv>
        </DrugDiv>
      ) : (
        <LoadingDrugDiv
          bgColor="white"
          style={{ marginBottom: "20px", paddingBottom: "29px" }}
        ></LoadingDrugDiv>
      )}
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
  transition: opacity 0.3s ease, width 0.3s ease;
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
