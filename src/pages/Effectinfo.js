import React from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
import EffectForm from "../Components/Effect/EffectForm";
import EffectList from "../Components/Effect/EffectList";

const Effectinfo = ({ todayDrugData, allDrugData }) => {
  return (
    <Main>
      <EffectForm todayDrugData={todayDrugData} layouyId="effect" />
      <EffectList allDrugData={allDrugData} />
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
`;

export default Effectinfo;
