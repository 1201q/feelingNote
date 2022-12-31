import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import ELcomponent from "./ELomponent";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const EffectList = ({ allDrugData }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().get("month") + 1);

  return (
    <EffectListDiv
      transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      initial={{ height: "100%", opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Header>{currentMonth}월의 상태 기록</Header>
      {allDrugData.map((data, index) => (
        <ELcomponent data={data} index={index} />
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
  font-family: "SUIT Variable", sans-serif;
  width: 100%;
  font-weight: 900;
  font-size: 27px;
  text-align: left;
  color: #333d4b;
  margin-bottom: 4px;
  border-radius: 10px;
`;

export default EffectList;
