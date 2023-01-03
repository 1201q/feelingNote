import styled from "styled-components";
import React from "react";
import FLcomponent from "./FLcomponent";
import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeelingList = ({ todayFeelingData, allFeelingData }) => {
  const history = useHistory();
  return (
    <FeelingListDiv layoutId="feeling">
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
        오늘
      </Header>
      <ComponentDiv>
        {todayFeelingData.map((data, index) => (
          <FLcomponent data={data} key={index} index={index} />
        ))}
        {todayFeelingData.length === 0 ? (
          <div style={{ height: "300px", width: "100%" }}>
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

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const Header = styled(motion.div)`
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  width: 100%;
  color: #333d4b;
  font-size: 27px;
  margin-left: 0px;
  margin-bottom: 2px;
  text-align: left;
  cursor: pointer;
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

export default FeelingList;
