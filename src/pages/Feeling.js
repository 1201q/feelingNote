import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import FeelingList from "../Components/Feeling/FeelingList";
import EveryDayFeelingList from "../Components/Feeling/EveryDayFeelingList";

const Feeling = ({ allFeelingData, todayFeelingData }) => {
  return (
    <Main>
      <FeelingList todayFeelingData={todayFeelingData} />
      <EveryDayFeelingList allFeelingData={allFeelingData} />
    </Main>
  );
};

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

export default Feeling;
