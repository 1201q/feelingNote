import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";

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
      <Header>{currentMonth}월의 약 기록</Header>
      <Component>
        {allDrugData.map((data, index) => (
          <DrugComponent key={index}>
            <DrugDateAndWhenEat>
              <Date>{dayjs(data.dateID).format("DD")}</Date>
              <WhenEat>
                <WhenEatBtn bgColor={"#3B82F6"}>
                  <Icon
                    src={require("../../icons/sun.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={
                      data.whenEatDrugAtday !== "" ? "0px 5px 0px 0px" : "0px"
                    }
                  />
                  {data.whenEatDrugAtday !== ""
                    ? dayjs(data.whenEatDrugAtday).format("HH:mm")
                    : ""}
                </WhenEatBtn>{" "}
                <WhenEatBtn bgColor={"#6366F1"}>
                  <Icon
                    src={require("../../icons/night-mode.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={
                      data.whenEatDrugAtnight !== "" ? "0px 5px 0px 0px" : "0px"
                    }
                  />
                  {data.whenEatDrugAtnight !== ""
                    ? dayjs(data.whenEatDrugAtnight).format("HH:mm")
                    : ""}
                </WhenEatBtn>{" "}
                <WhenEatBtn bgColor={"#30516E"}>
                  <Icon
                    src={require("../../icons/half-moon.png")}
                    name="sleep"
                    imgwidth="18px"
                    imgheight="18px"
                    imgmargin={
                      data.whenEatDrugAtsleep !== "" ? "0px 5px 0px 0px" : "0px"
                    }
                  />
                  {data.whenEatDrugAtsleep !== ""
                    ? dayjs(data.whenEatDrugAtsleep).format("HH:mm")
                    : ""}
                </WhenEatBtn>{" "}
              </WhenEat>
            </DrugDateAndWhenEat>
          </DrugComponent>
        ))}
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
  padding: 13px 0px;
  font-weight: 800;
  font-size: 17px;
`;

const ResolutionDiv = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const DrugDateAndWhenEat = styled.div`
  display: flex;

  width: 100%;
`;

const WhenEat = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 0px;
`;

const WhenEatBtn = styled.button`
  font-family: "Pretendard-Regular";
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  padding: 0px 5px;
  border-radius: 10px;
  border: none;
  text-align: center;
  width: 30%;
  height: 100%;
  font-size: 20px;
  font-weight: 800;
  background-color: rgba(120, 168, 135, 0.1);
  color: #68a078;
  @media screen and (max-width: 768px) {
    font-size: 18px;
    height: 30px;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: flex-end;

  min-width: 40px;
  height: 100%;
  width: 30px;
  border-radius: 50%;
  font-size: 30px;
  font-weight: 800;
  margin-right: 0px;
`;
const SideEffect = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin-left: 20px;
  background-color: #ffeeee;
  border-radius: 5px;
  color: #f04b58;

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 10px;
    padding: 5px 0px;
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
  padding-bottom: 0px;
  margin-bottom: 6px;
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
