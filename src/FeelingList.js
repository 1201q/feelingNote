import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const FeelingList = ({ todayFeelingData }) => {
  return (
    <ListDiv>
      <Header>시간순</Header>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {todayFeelingData.map((data, index) => (
          // 개별 컴포넌트
          <TodayFeelingList
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.2,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={require(`./icons/${data.feeling}.png`)}
                width="30px"
                style={{ marginRight: "10px" }}
              />
              {data.text}
            </div>
            <TodayFeelingListTime>
              {dayjs(data.time).format("HH시 mm분")}
            </TodayFeelingListTime>
          </TodayFeelingList>
        ))}
      </div>
    </ListDiv>
  );
};

const ListDiv = styled.div`
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
  font-size: 27px;
  text-align: left;
  width: 100%;
  color: #333d4b;
  margin-left: 0px;
  margin-bottom: 2px;
`;

const TodayFeelingList = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 13px 0px;
  font-weight: 800;
  font-size: 17px;
`;

const TodayFeelingListTime = styled.div`
  text-align: center;
  min-width: 65px;
  background-color: #f2f4f6;
  border-radius: 10px;
  padding: 6px 6px;
  margin-left: 2px;
  font-weight: 800;
  font-size: 13px;
`;

export default FeelingList;
