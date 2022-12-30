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
      <Component>
        {allDrugData.map((data, index) => (
          <DrugComponent key={index}>
            <DrugComponentHeader>
              <Date>{dayjs(data.dateID).format("MM월 DD일")}</Date>
              <WhenEat>
                <WhenEatBtn
                  bgColor={
                    data.whenEatDrugAtday !== ""
                      ? "rgba(120, 168, 135, 0.1)"
                      : "#ffeeee"
                  }
                >
                  {/* <Icon
                    src={require("../icons/sun.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={
                      data.whenEatDrugAtday !== "" ? "0px 5px 0px 0px" : "0px"
                    }
                  /> */}
                  {data.whenEatDrugAtday !== ""
                    ? dayjs(data.whenEatDrugAtday).format("HH:mm")
                    : "안먹음"}
                </WhenEatBtn>{" "}
                <WhenEatBtn
                  bgColor={
                    data.whenEatDrugAtnight !== ""
                      ? "rgba(120, 168, 135, 0.1)"
                      : "#ffeeee"
                  }
                >
                  {/* <Icon
                    src={require("../icons/night-mode.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={
                      data.whenEatDrugAtnight !== "" ? "0px 5px 0px 0px" : "0px"
                    }
                  /> */}
                  {data.whenEatDrugAtnight !== ""
                    ? dayjs(data.whenEatDrugAtnight).format("HH:mm")
                    : "안먹음"}
                </WhenEatBtn>{" "}
                <WhenEatBtn
                  bgColor={
                    data.whenEatDrugAtsleep !== ""
                      ? "rgba(120, 168, 135, 0.1)"
                      : "#ffeeee"
                  }
                >
                  {/* <Icon
                    src={require("../icons/half-moon.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={
                      data.whenEatDrugAtsleep !== "" ? "0px 5px 0px 0px" : "0px"
                    }
                  /> */}
                  {data.whenEatDrugAtsleep !== ""
                    ? dayjs(data.whenEatDrugAtsleep).format("HH:mm")
                    : "안먹음"}
                </WhenEatBtn>{" "}
              </WhenEat>
            </DrugComponentHeader>

            {data.sideEffect && (
              <SideEffect>
                <div style={{ padding: "5px 10px" }}>{data.sideEffect}</div>
              </SideEffect>
            )}
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
      </Component>
    </DrugListDiv>
  );
};

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

const Component = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DrugComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding-top: 19px;
  font-weight: 800;
  font-size: 17px;
`;

const DrugComponentHeader = styled.div`
  display: flex;
`;

const WhenEat = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const WhenEatBtn = styled.button`
  font-family: "Pretendard-Regular";
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 10px;
  border: none;
  text-align: center;
  width: 20%;
  max-width: 53px;
  height: 20px;
  font-size: 12px;
  font-weight: 800;
  /* background-color: rgba(120, 168, 135, 0.1); */
  background-color: ${(props) => props.bgColor};
  color: #68a078;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  height: 30px;
  font-size: 14px;
  font-weight: 800;
  padding-left: 2px;
`;
const SideEffect = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 15px;
  font-weight: 800;
  margin-left: 0px;
  margin-top: 10px;
  padding: 0px 0px;
  background-color: #f2f4f6;
  border-radius: 10px;
  color: #6b7684;

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 10px;
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

  border-radius: 10px;
`;

const Icon = styled(motion.img)`
  width: ${(props) => props.imgwidth};
  height: ${(props) => props.imgheight};
  padding: ${(props) => props.imgpadding};
  margin: ${(props) => props.imgmargin};
  transition: all 0.3s ease;
`;

export default DrugList;
