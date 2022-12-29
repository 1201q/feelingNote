import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { dbService } from "../fbase";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import FeelingForm from "../Components/FeelingForm";
import FeelingList from "../Components/FeelingList";
import Drug from "../Components/Drug";
import DrugList from "../Components/DrugList";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function Home({
  todayDrugData,
  todayFeelingData,
  drugloading,
  allDrugData,
  allFeelingData,
}) {
  return (
    <AnimatePresence mode="sync">
      <Main
        layout
        transition={{ type: "spring", duration: 0.5, delay: 0.2, bounce: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <FeelingForm />
        <Drug
          todayDrugData={todayDrugData}
          Drugloading={drugloading}
          layoutId="drug"
        />
        <FeelingList todayFeelingData={todayFeelingData} />
      </Main>
    </AnimatePresence>
  );
}

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

export default Home;
