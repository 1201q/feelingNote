import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
  faAngleLeft,
  faAngleRight,
  faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DrugList = ({ allDrugData }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  useEffect(() => {
    console.log();
  }, []);

  const onClick = (addORminus) => {
    setCurrentMonth(currentMonth.add(addORminus, "month"));
  };

  return (
    <DrugListDiv
      transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      initial={{ height: "100%", opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Header>
        {currentMonth.format("M")}월의 약 기록{" "}
        <span>
          <button
            onClick={() => {
              onClick(-1);
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} size="2x" />
          </button>
          <button
            onClick={() => {
              onClick(1);
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} size="2x" />
          </button>
        </span>
      </Header>
      <Component>
        {allDrugData
          .filter(
            (data) =>
              dayjs(data.dateID).get("month") === currentMonth.get("month")
          )
          .map((data, index) => (
            <DrugComponent key={index}>
              <DrugDateAndWhenEat>
                <Date>{dayjs(data.dateID).format("MM.DD")}</Date>
                <WhenEat>
                  <WhenEatBtn
                    bgColor={
                      data.whenEatDrugAtday !== ""
                        ? "rgba(120, 168, 135, 0.2)"
                        : "#FDE1DF"
                    }
                    fontSize={data.whenEatDrugAtday !== "" ? "18px" : "14px"}
                    fontColor={
                      data.whenEatDrugAtday !== "" ? "#68a078" : "#DA4230"
                    }
                  >
                    {data.whenEatDrugAtday !== "" ? (
                      <Icon
                        src={require("../../icons/sun.png")}
                        name="sleep"
                        imgwidth="18px"
                        imgheight="18px"
                        imgmargin={
                          data.whenEatDrugAtsun !== ""
                            ? "0px 5px 0px 0px"
                            : "0px"
                        }
                      />
                    ) : (
                      ""
                    )}
                    {data.whenEatDrugAtday !== ""
                      ? dayjs(data.whenEatDrugAtday).format("HH:mm")
                      : "기록없음"}
                  </WhenEatBtn>{" "}
                  <WhenEatBtn
                    bgColor={
                      data.whenEatDrugAtnight !== ""
                        ? "rgba(120, 168, 135, 0.2)"
                        : "#FDE1DF"
                    }
                    fontSize={data.whenEatDrugAtnight !== "" ? "18px" : "14px"}
                    fontColor={
                      data.whenEatDrugAtnight !== "" ? "#68a078" : "#DA4230"
                    }
                  >
                    {data.whenEatDrugAtnight !== "" ? (
                      <Icon
                        src={require("../../icons/night-mode.png")}
                        name="sleep"
                        imgwidth="18px"
                        imgheight="18px"
                        imgmargin={
                          data.whenEatDrugAtnight !== ""
                            ? "0px 5px 0px 0px"
                            : "0px"
                        }
                      />
                    ) : (
                      ""
                    )}
                    {data.whenEatDrugAtnight !== ""
                      ? dayjs(data.whenEatDrugAtnight).format("HH:mm")
                      : "기록없음"}
                  </WhenEatBtn>{" "}
                  <WhenEatBtn
                    bgColor={
                      data.whenEatDrugAtsleep !== ""
                        ? "rgba(120, 168, 135, 0.2)"
                        : "#FDE1DF"
                    }
                    fontSize={data.whenEatDrugAtsleep !== "" ? "18px" : "14px"}
                    fontColor={
                      data.whenEatDrugAtsleep !== "" ? "#68a078" : "#DA4230"
                    }
                  >
                    {data.whenEatDrugAtsleep !== "" ? (
                      <Icon
                        src={require("../../icons/half-moon.png")}
                        name="sleep"
                        imgwidth="18px"
                        imgheight="18px"
                        imgmargin={
                          data.whenEatDrugAtsleep !== ""
                            ? "0px 5px 0px 0px"
                            : "0px"
                        }
                      />
                    ) : (
                      ""
                    )}
                    {data.whenEatDrugAtsleep !== ""
                      ? dayjs(data.whenEatDrugAtsleep).format("HH:mm")
                      : "기록없음"}
                  </WhenEatBtn>{" "}
                </WhenEat>
              </DrugDateAndWhenEat>
            </DrugComponent>
          ))}

        {allDrugData.filter(
          (data) =>
            dayjs(data.dateID).get("month") === currentMonth.get("month")
        ).length === 0 ? (
          <div style={{ height: "300px" }}>
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

const DrugDateAndWhenEat = styled.div`
  display: flex;
  flex-direction: column;
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

  border-radius: 10px;
  border: none;
  text-align: center;
  width: 30%;
  height: 100%;
  font-size: 18px;
  font-weight: 800;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  margin: 0;
  @media screen and (max-width: 768px) {
    font-size: ${(props) => props.fontSize};
    height: 30px;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 16px;
  font-weight: 100;
  color: gray;
  margin-bottom: 5px;
  padding-left: 2px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6e7986;
    padding: 0;
    margin-left: 10px;
  }
`;

const Icon = styled(motion.img)`
  width: ${(props) => props.imgwidth};
  height: ${(props) => props.imgheight};
  padding: ${(props) => props.imgpadding};
  margin: ${(props) => props.imgmargin};
  transition: all 0.3s ease;
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

export default DrugList;
