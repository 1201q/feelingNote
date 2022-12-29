import styled from "styled-components";
import React from "react";
import FLcomponent from "./FLcomponent";
import { motion } from "framer-motion";

const FeelingList = ({ todayFeelingData }) => {
  return (
    <FeelingListDiv
    // layout
    // transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
    // initial={{ height: "100%", opacity: 0, scale: 0.8 }}
    // animate={{ opacity: 1, scale: 1 }}
    >
      <Header>시간순</Header>
      <ComponentDiv>
        {todayFeelingData.map((data, index) => (
          <FLcomponent data={data} key={index} index={index} />
        ))}
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

  @media screen and (max-width: 768px) {
    width: 82%;
  }
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

const ComponentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default FeelingList;
