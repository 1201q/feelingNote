import styled from "styled-components";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import FLcomponent from "./FLcomponent";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const EveryDayFeelingList = ({ allFeelingData }) => {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const onClick = (addORminus) => {
    setCurrentDay(currentDay.add(addORminus, "day"));
  };

  useEffect(() => {
    console.log(dayjs(allFeelingData[96].time).format("YYMMDD"));
    console.log(currentDay.format("YYMMDD"));
    console.log(
      allFeelingData.filter(
        (data) =>
          dayjs(data.time).format("YYMMDD") === currentDay.format("YYMMDD")
      )
    );
  }, []);

  const history = useHistory();
  return (
    <FeelingListDiv
      transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      initial={{ height: "100%", opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Header
        onClick={() => {
          history.push("/feeling");
        }}
        whileHover={{ scale: 1.0, background: "white " }}
        whileTap={{
          scale: 0.98,
          background: "rgba(176,184,193, 0.1)",
        }}
        transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      >
        {currentDay.format("M월 D일")}
        <span>
          <button
            onClick={() => {
              onClick(-1);
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} size="2x" />
          </button>

          <button
            onClick={() => {
              onClick(1);
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} size="2x" />
          </button>
        </span>
      </Header>
      <ComponentDiv>
        {allFeelingData
          .filter(
            (data) =>
              dayjs(data.time).format("YYMMDD") === currentDay.format("YYMMDD")
          )
          .map((data, index) => (
            <FLcomponent data={data} key={index} index={index} />
          ))}

        {allFeelingData.filter(
          (data) =>
            dayjs(data.time).format("YYMMDD") === currentDay.format("YYMMDD")
        ).length === 0 ? (
          <div style={{ height: "300px" }}>
            <NoDataDisplay
              transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
              initial={{ height: "100%", opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FontAwesomeIcon
                icon={faFileCircleXmark}
                size="3x"
                style={{ marginBottom: "25px" }}
              />
              기록이 없어요.
            </NoDataDisplay>
          </div>
        ) : (
          ""
        )}
      </ComponentDiv>
    </FeelingListDiv>
  );
};

const FeelingListDiv = styled(motion.div)`
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
  -webkit-tap-highlight-color: transparent;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const Header = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  width: 100%;
  color: #333d4b;
  font-size: 27px;
  margin-left: 0px;
  margin-bottom: 2px;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6e7986;
    padding: 0;
    margin-left: 10px;
    -webkit-tap-highlight-color: transparent;
  }
`;

const ComponentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NoDataDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: lightgray;
  font-weight: 800;
  font-size: 24px;
`;

export default EveryDayFeelingList;
