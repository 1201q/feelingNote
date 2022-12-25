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
  DayTime,
  NightTime,
  Drugloading,
}) => {
  // 약 기록 시작 => 데이, 나이트 버튼 출력

  // 현재시간을 기록하는데 필요
  const [stopwatchTime, setStopwatchTime] = useState(dayjs().format());

  // button on off{}
  const [dayBtn, setDayBtn] = useState(DayOnOff);
  const [nightBtn, setNightBtn] = useState(NightOnOff);

  // 로딩
  const [drugloading, setDrugLoading] = useState(Drugloading);

  const dayAndNightBtnClick = (e) => {
    let dayOnOff = false;
    let nightOnOff = false;
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
              bgcolor="#4448FF"
              name="day"
              opacity={DayOnOff ? "1" : "0.7"}
              fontSize={DayOnOff ? "20px" : "16px"}
            >
              <Icon
                src={require("../icons/sun.png")}
                imgwidth="35px"
                imgheight="35px"
                imgpadding="2px 5px 0px 4px"
                imgmargin="0px 0px 0px 0px"
              />
              {DayOnOff
                ? `${dayjs(DayTime).format("HH시 mm분")}`
                : "먹지 않았어요"}
            </DayAndNightButton>
            <DayAndNightButton
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={dayAndNightBtnClick}
              bgcolor={"#2b2c30"}
              name="night"
              opacity={NightOnOff ? "1" : "0.7"}
              fontSize={NightOnOff ? "20px" : "16px"}
            >
              <Icon
                src={require("../icons/night-mode.png")}
                imgwidth="25px"
                imgheight="25px"
                imgpadding="2px 10px 0px 9px"
                imgmargin="0px 0px 0px 0px"
              />
              {NightOnOff
                ? `${dayjs(NightTime).format("HH시 mm분")}`
                : `먹지 않았어요`}
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
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  opacity: 0.7;
  width: 49%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.bgcolor};
  opacity: ${(props) => props.opacity};
  cursor: pointer;
  color: #ebf5ff;
  font-weight: 900;
  font-size: 20px;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: ${(props) => props.fontSize};
    width: 48%;
  }
`;

const Icon = styled(motion.img)`
  width: ${(props) => props.imgwidth};
  height: ${(props) => props.imgheight};
  padding: ${(props) => props.imgpadding};
  margin: ${(props) => props.imgmargin};
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
