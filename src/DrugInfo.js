import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { dbService } from "./fbase";
import { motion } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DrugInfo = ({
  DrugData,
  Day = false,
  Night = false,
  DayTime,
  NightTime,
}) => {
  // 약 기록 시작 => 데이, 나이트 버튼 출력

  // 현재시간
  const [stopwatchTime, setStopwatchTime] = useState(dayjs().format());

  // button {}
  const [dayBtn, setDayBtn] = useState(Day);
  const [nightBtn, setNightBtn] = useState(Night);

  const returnFilterDrugData = () => {
    return DrugData.filter(
      (item) => item.dateID === dayjs().format("YYYY-M-D")
    )[0];
  };

  const dayAndNightChange = async (e) => {
    e.preventDefault();
    setStopwatchTime(dayjs().format());
    if (e.target.name === "day") {
      setDayBtn(!dayBtn);
      if (dayBtn === false) {
        await dbService.doc(`드러그/${returnFilterDrugData().id}`).update({
          day: true,
          whenEatDrugAtDay: dayjs(stopwatchTime).format(),
        });

        // 기록
      } else {
        await dbService.doc(`드러그/${returnFilterDrugData().id}`).update({
          day: false,
          whenEatDrugAtDay: "",
        });

        // 삭제
      }
    } else if (e.target.name === "night") {
      setNightBtn(!nightBtn);
      if (nightBtn === false) {
        await dbService.doc(`드러그/${returnFilterDrugData().id}`).update({
          night: true,
          whenEatDrugAtNight: dayjs(stopwatchTime).format(),
        });
        // 기록
      } else {
        await dbService.doc(`드러그/${returnFilterDrugData().id}`).update({
          night: false,
          whenEatDrugAtNight: "",
        });

        // 삭제
      }
    }
  };

  return (
    <AddBarDiv>
      <AddBarHeader>약</AddBarHeader>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <DayAndNightButton
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={dayAndNightChange}
          bgcolor="#4448FF"
          name="day"
          opacity={dayBtn ? "1" : "0.7"}
          fontSize={dayBtn ? "20px" : "16px"}
        >
          <IconImage
            src={require("./icons/sun.png")}
            imgwidth="35px"
            imgheight="35px"
            imgpadding="2px 5px 0px 4px"
            imgmargin="0px 0px 0px 0px"
          />
          {dayBtn ? `${dayjs(DayTime).format("HH시 mm분")}` : "먹지 않았어요"}
        </DayAndNightButton>
        <DayAndNightButton
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={dayAndNightChange}
          bgcolor={"#2b2c30"}
          name="night"
          opacity={nightBtn ? "1" : "0.7"}
          fontSize={nightBtn ? "20px" : "16px"}
        >
          <IconImage
            src={require("./icons/night-mode.png")}
            imgwidth="25px"
            imgheight="25px"
            imgpadding="2px 10px 0px 9px"
            imgmargin="0px 0px 0px 0px"
          />

          {nightBtn
            ? `${dayjs(NightTime).format("HH시 mm분")}`
            : `먹지 않았어요`}
        </DayAndNightButton>
      </div>
    </AddBarDiv>
  );
};

const AddBarHeader = styled.div`
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  width: 100%;
  color: #333d4b;
  font-size: 27px;
  margin-left: 0px;
  margin-bottom: 15px;
  text-align: left;
`;

const AddBarDiv = styled.div`
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

const IconImage = styled(motion.img)`
  width: ${(props) => props.imgwidth};
  height: ${(props) => props.imgheight};
  padding: ${(props) => props.imgpadding};
  margin: ${(props) => props.imgmargin};
`;

export default DrugInfo;
