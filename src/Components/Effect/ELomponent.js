import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DLcomponent = ({ data }) => {
  return (
    <ELComponentDiv>
      <Header>
        <Date>{dayjs(data.dateID).format("MM.DD")}</Date>
        <WhenEat>
          <WhenEatDot
            bgColor={
              data.whenEatDrugAtday !== ""
                ? "rgba(120, 168, 135, 0.7)"
                : "rgba(240,68,82, 0.6)"
            }
          ></WhenEatDot>
          <WhenEatDot
            bgColor={
              data.whenEatDrugAtnight !== ""
                ? "rgba(120, 168, 135, 0.7)"
                : "rgba(240,68,82, 0.6)"
            }
          ></WhenEatDot>
          <WhenEatDot
            bgColor={
              data.whenEatDrugAtsleep !== ""
                ? "rgba(120, 168, 135, 0.7)"
                : "rgba(240,68,82, 0.6)"
            }
          ></WhenEatDot>
        </WhenEat>
      </Header>
      <Effect
        bgColor={data.sideEffect ? "#f2f4f6" : "white"}
        fontColor={data.sideEffect ? "#191F28" : "#6E7986"}
      >
        {data.sideEffect ? (
          <div style={{ padding: "5px 10px" }}>{data.sideEffect}</div>
        ) : (
          <div>작성하지 않았어요.</div>
        )}
      </Effect>
    </ELComponentDiv>
  );
};
const ELComponentDiv = styled.div`
  width: 100%;
  margin-top: 15px;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-bottom: 2px;
`;

const WhenEat = styled.div`
  width: 20%;
  min-width: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 7px 0px;

  @media screen and (max-width: 768px) {
    width: 10%;
    min-width: 38px;
    display: flex;
    justify-content: space-around;
  }
`;

const WhenEatDot = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  font-size: 1px;
  font-weight: 800;
  background-color: ${(props) => props.bgColor};
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 16px;
  font-weight: 100;
  color: gray;
  padding-left: 2px;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const Effect = styled.div`
  width: 100%;
  height: 100%;
  font-size: 19px;
  font-weight: 800;
  border-radius: 10px;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    margin-left: 2px;
  }
`;

export default DLcomponent;
