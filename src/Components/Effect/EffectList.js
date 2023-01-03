import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import ELcomponent from "./ELomponent";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const EffectList = ({ allDrugData }) => {
  const [currentDay, setCurrentDay] = useState(dayjs());

  const onClick = (addORminus) => {
    setCurrentDay(currentDay.add(addORminus, "month"));
  };

  return (
    <EffectListDiv
      transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      initial={{ height: "100%", opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Header>
        {currentDay.get("month") + 1}월의 상태 기록
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
      {allDrugData
        .filter(
          (data) => dayjs(data.dateID).get("month") === currentDay.get("month")
        )
        .map((data, index) => (
          <ELcomponent data={data} index={index} key={index} />
        ))}
    </EffectListDiv>
  );
};

//전체 div + 애니메이션
const EffectListDiv = styled(motion.div)`
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "SUIT Variable", sans-serif;
  width: 100%;
  font-weight: 900;
  font-size: 27px;
  text-align: left;
  color: #333d4b;
  margin-bottom: 4px;
  border-radius: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6e7986;
    padding: 0;
    margin-left: 10px;
  }
`;

export default EffectList;
