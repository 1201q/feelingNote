import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import DLcomponent from "./DLcomponent";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DrugList = ({ allDrugData }) => {
  useEffect(() => {
    allDrugData.map((data, index) =>
      console.log(dayjs(data.whenEatDrugAtday).format("HH:mm"))
    );
  }, []);
  return (
    <DrugListDiv
      layout
      transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      initial={{ height: "100%", opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Header>기록</Header>
      <ComponentDiv>
        {/* date */}
        <DayNightSleepDateContainer>
          {allDrugData.map((data, index) => (
            <li key={index}>{dayjs(data.dateID).format("MM-DD")}</li>
          ))}
        </DayNightSleepDateContainer>

        {/* time */}
        <DayNightSleepTimeContainer>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <DayNightSleepTimeDiv>
              {allDrugData.map((data, index) => (
                <div key={index}>
                  {dayjs(data.whenEatDrugAtday).format("HH:mm")}
                </div>
              ))}
            </DayNightSleepTimeDiv>
            <DayNightSleepTimeDiv>
              {allDrugData.map((data, index) => (
                <div key={index}>
                  {dayjs(data.whenEatDrugAtnight).format("HH:mm")}
                </div>
              ))}
            </DayNightSleepTimeDiv>
            <DayNightSleepTimeDiv>
              {allDrugData.map((data, index) => (
                <div key={index}>
                  {dayjs(data.whenEatDrugAtsleep).format("HH:mm")}
                </div>
              ))}
            </DayNightSleepTimeDiv>
          </div>
        </DayNightSleepTimeContainer>
        <SideEffectContainer>
          {allDrugData.map((data, index) => (
            <div key={index}>{data.sideEffect}</div>
          ))}
        </SideEffectContainer>
        {/* 부작용 */}
        {/* {allDrugData.map((data, index) => (
          <DLcomponent data={data} key={index} index={index} />
        ))} */}
      </ComponentDiv>
    </DrugListDiv>
  );
};

const DayNightSleepTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  align-items: flex-start;
`;

const DayNightSleepTimeContainer = styled.div`
  border: 1px solid blue;
`;

const SideEffectContainer = styled.div`
  border: 1px solid green;
`;

const SideEffectDiv = styled.div`
  border: 1px solid green;
`;

const DayNightSleepDateContainer = styled.div`
  width: 30%;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;

const DrugListDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  max-width: 900px;
  min-height: 101px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const ComponentDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  width: 100%;
  color: #333d4b;
  font-size: 27px;
  margin-left: 0px;
  margin-bottom: 2px;
  text-align: left;
`;

export default DrugList;
