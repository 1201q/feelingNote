import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import DLcomponent from "./DLcomponent";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DrugList = ({ allDrugData }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().get("month") + 1);
  useEffect(() => {
    allDrugData.map((data, index) =>
      console.log(dayjs(data.whenEatDrugAtday).format("HH:mm"))
    );
    console.log(dayjs().get("month") + 1);
  }, []);
  return (
    <DrugListDiv
      transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      initial={{ height: "100%", opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Header>{currentMonth}월의 기록</Header>
      {allDrugData.map((data, index) => (
        <DrugComponent key={index}>
          <DrugComponentHeader>
            <DateWhenEat>
              <Date>{dayjs(data.dateID).format("MM.DD")}</Date>{" "}
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
            </DateWhenEat>

            <SideEffect
              bgColor={data.sideEffect ? "#ffeeee" : "#f2f4f6"}
              fontColor={data.sideEffect ? "#f04452" : "#6E7986"}
            >
              <div style={{ padding: "5px 10px" }}>
                {data.sideEffect ? data.sideEffect : "작성하지 않았어요."}
              </div>
            </SideEffect>
          </DrugComponentHeader>
        </DrugComponent>
      ))}
      {/* <DrugComponent>
          <ResolutionDiv>
            <DrugDateAndWhenEat>
              <Date>1</Date>
              <WhenEat>
                <WhenEatBtn bgColor={"#3B82F6"}>
                  <Icon
                    src={require("../icons/sun.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={"0px 5px 0px 0px"}
                  />
                  07:02
                </WhenEatBtn>{" "}
                <WhenEatBtn bgColor={"#6366F1"}>
                  <Icon
                    src={require("../icons/night-mode.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={"0px 5px 0px 0px"}
                  />
                  09:07
                </WhenEatBtn>{" "}
                <WhenEatBtn bgColor={"#30516E"}>
                  <Icon
                    src={require("../icons/half-moon.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={"0px 5px 0px 0px"}
                  />
                  23:48
                </WhenEatBtn>{" "}
              </WhenEat>
            </DrugDateAndWhenEat>
            <SideEffect>
              <div style={{ paddingLeft: "10px" }}>1</div>
              부작용
            </SideEffect>
          </ResolutionDiv>
        </DrugComponent> */}
    </DrugListDiv>
  );
};

const Header = styled.div`
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  font-size: 27px;
  text-align: left;
  width: 100%;
  color: #333d4b;
  margin-left: 0px;
  margin-bottom: 9px;

  border-radius: 10px;
`;

const DrugListDiv = styled(motion.div)`
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

const DrugComponent = styled.div`
  width: 100%;
  margin-bottom: 17px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 17px;
`;

const DrugComponentHeader = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DateWhenEat = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  min-width: 47px;
  height: 100%;
`;

const WhenEat = styled.div`
  width: 20%;
  min-width: 50px;
  display: flex;
  justify-content: space-around;
  padding-left: 2.5px;

  @media screen and (max-width: 768px) {
    width: 10%;
    min-width: 38px;
    display: flex;
    justify-content: space-around;
    padding-left: 2.5px;
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
  height: 22px;
  font-size: 20px;
  font-weight: 800;
  padding-left: 2px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
const SideEffect = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 800;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;

  color: ${(props) => props.fontColor};

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 15px;
    margin-left: 7px;
  }
`;

export default DrugList;
