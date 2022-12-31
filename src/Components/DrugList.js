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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Date>{dayjs(data.dateID).format("MM월 DD일")}</Date>{" "}
              <WhenEat>
                <WhenEatBtn
                  bgColor={
                    data.whenEatDrugAtday !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                >
                  {/* {data.whenEatDrugAtday !== ""
                    ? dayjs(data.whenEatDrugAtday).format("HH:mm")
                    : "안먹음"} */}
                </WhenEatBtn>{" "}
                <WhenEatBtn
                  bgColor={
                    data.whenEatDrugAtnight !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                >
                  {/* {data.whenEatDrugAtnight !== ""
                    ? dayjs(data.whenEatDrugAtnight).format("HH:mm")
                    : "안먹음"} */}
                </WhenEatBtn>{" "}
                <WhenEatBtn
                  bgColor={
                    data.whenEatDrugAtsleep !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                >
                  {/* {data.whenEatDrugAtsleep !== ""
                    ? dayjs(data.whenEatDrugAtsleep).format("HH:mm")
                    : "안먹음"} */}
                </WhenEatBtn>{" "}
              </WhenEat>
            </div>

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

const WhenEat = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 3px;
`;

const WhenEatBtn = styled.button`
  font-family: "Pretendard-Regular";
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 50%;
  border: none;
  text-align: center;
  width: 12px;
  height: 12px;
  font-size: 0px;
  font-weight: 800;
  background-color: ${(props) => props.bgColor};
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90px;
  height: 22px;
  font-size: 17px;
  font-weight: 800;
  padding-left: 2px;
`;
const SideEffect = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 800;
  background-color: #ffeeee;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  color: #f04452;
  color: ${(props) => props.fontColor};

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 15px;
    margin-left: 0px;
  }
`;

export default DrugList;
