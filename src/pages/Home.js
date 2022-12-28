import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { dbService } from "../fbase";
import { motion, AnimatePresence } from "framer-motion";
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
  const [drugClick, setDrugClick] = useState(true);
  const [popLayout, setPopLayout] = useState(false);

  useEffect(() => {
    console.log(!drugClick);
  }, [drugClick]);
  return (
    <AnimatePresence mode="sync">
      <Main>
        {drugClick && <FeelingForm drugClick={drugClick} />}
        <Drug
          todayDrugData={todayDrugData}
          Drugloading={drugloading}
          setDrugClick={setDrugClick}
          drugClick={drugClick}
        />{" "}
        {!drugClick && <DrugList allDrugData={allDrugData} />}
        {/* <Drug todayDrugData={todayDrugData} Drugloading={drugloading} /> */}
        {drugClick && <FeelingList todayFeelingData={todayFeelingData} />}
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

const LoadingDrug = styled.div`
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

export default Home;
