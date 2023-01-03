import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, useScroll } from "framer-motion";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Calendar = ({ allDrugData }) => {
  const today = dayjs();
  const thisMonthStart = today.startOf("month");
  const thisMonthEnd = today.endOf("month"); //월요일이 0 일요일이 6

  const [selectDay, setSelectDay] = useState(today);
  const [selectMonthStart, setSelectMonthStart] = useState(thisMonthStart);
  const [selectMonthEnd, setSelectMonthEnd] = useState(thisMonthEnd);

  let arr = [];
  let CalenDate = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    // console.log(allDrugData);
    // console.log(allDrugData.map((data) => data.day));
    // console.log(allDrugData.map((data) => data.night));
    // console.log(allDrugData.map((data) => data.sleep));
  }, [allDrugData]);

  const F = (param, format) => {
    return Number(param.format(format));
  };

  const makeArr = () => {
    //앞에 공백 추가
    Array(F(selectMonthStart, "d"))
      .fill(" ")
      .map((i) => {
        arr.push(i);
      });

    for (let i = F(selectMonthStart, "DD"); i <= F(selectMonthEnd, "DD"); i++) {
      arr.push(i);
    }
    console.log(arr.length);
  };

  const calenar = () => {
    let Istoday = false;
    let IsSameMonth = false;
    let DrugArr = allDrugData.filter(
      (data) => dayjs(data.dateID).get("month") === selectDay.get("month")
    );
    // console.log(DrugArr);
    let thisMonthDateArr = DrugArr.map((data) =>
      dayjs(data.dateID).get("date")
    );

    if (today.get("month") === selectDay.get("month")) {
      IsSameMonth = true;
      if (today.get("year") === selectDay.get("year")) {
        Istoday = true;
      }
    }

    let calen = [];
    let weekarr = [];
    makeArr();

    // console.log(thisMonthDateArr.map((data, index) => data === arr[i]));

    //일월화수목금토/
    for (let i = 0; i < 7; i++) {
      weekarr.push(<DateHeader>{CalenDate[i]}</DateHeader>);
    }
    calen.push(<Week>{weekarr}</Week>);
    weekarr = [];
    // ////////////

    for (let i = 0; i <= arr.length + 7; i++) {
      if (i % 7 === 0 && i !== 0) {
        calen.push(<Week>{weekarr}</Week>);
        weekarr = [];
        weekarr.push(
          <Day>
            <DayDate
              bgColor={
                Istoday === true && arr[i] === today.get("date") ? "red" : ""
              }
              fontColor={
                Istoday === true && arr[i] === today.get("date") ? "white" : ""
              }
            >
              {arr[i]}
            </DayDate>{" "}
            {typeof DrugArr.filter(
              (data) => dayjs(data.dateID).get("date") === arr[i]
            )[0] == "undefined" ? (
              <WhenEat></WhenEat>
            ) : (
              <WhenEat>
                <WhenEatDot
                  bgColor={
                    DrugArr.filter(
                      (data) => dayjs(data.dateID).get("date") === arr[i]
                    )[0].whenEatDrugAtday !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                ></WhenEatDot>
                <WhenEatDot
                  bgColor={
                    DrugArr.filter(
                      (data) => dayjs(data.dateID).get("date") === arr[i]
                    )[0].whenEatDrugAtnight !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                ></WhenEatDot>
                <WhenEatDot
                  bgColor={
                    DrugArr.filter(
                      (data) => dayjs(data.dateID).get("date") === arr[i]
                    )[0].whenEatDrugAtsleep !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                ></WhenEatDot>
              </WhenEat>
            )}
          </Day>
        );
      } else {
        weekarr.push(
          <Day>
            <DayDate
              bgColor={
                Istoday === true && arr[i] === today.get("date") ? "red" : ""
              }
              fontColor={
                Istoday === true && arr[i] === today.get("date") ? "white" : ""
              }
            >
              {arr[i]}
            </DayDate>
            {typeof DrugArr.filter(
              (data) => dayjs(data.dateID).get("date") === arr[i]
            )[0] == "undefined" ? (
              <WhenEat></WhenEat>
            ) : (
              <WhenEat>
                <WhenEatDot
                  bgColor={
                    DrugArr.filter(
                      (data) => dayjs(data.dateID).get("date") === arr[i]
                    )[0].whenEatDrugAtday !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                ></WhenEatDot>
                <WhenEatDot
                  bgColor={
                    DrugArr.filter(
                      (data) => dayjs(data.dateID).get("date") === arr[i]
                    )[0].whenEatDrugAtnight !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                ></WhenEatDot>
                <WhenEatDot
                  bgColor={
                    DrugArr.filter(
                      (data) => dayjs(data.dateID).get("date") === arr[i]
                    )[0].whenEatDrugAtsleep !== ""
                      ? "rgba(120, 168, 135, 0.7)"
                      : "rgba(240,68,82, 0.6)"
                  }
                ></WhenEatDot>
              </WhenEat>
            )}
          </Day>
        );
      }
    }

    return calen;
  };

  const onClick = (addORminus) => {
    setSelectDay(selectDay.add(addORminus, "month"));
    setSelectMonthStart(selectDay.add(addORminus, "month").startOf("month"));
    setSelectMonthEnd(selectDay.add(addORminus, "month").endOf("month"));
  };

  return (
    <CalendarDiv>
      <Header>
        {F(selectDay, "YY")}년 {F(selectDay, "M")}월
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
      <DrugCalendar>{calenar()}</DrugCalendar>
    </CalendarDiv>
  );
};

const CalendarDiv = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 100%;
  max-width: 900px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const Header = styled(motion.div)`
  /* &:hover {
    background-color: rgba(176, 184, 193, 0.3);
    border-radius: 10px;
    transition: all 0.3s;
  } */
  display: flex;
  justify-content: space-between;
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  font-size: 27px;
  text-align: left;
  width: 100%;
  color: #333d4b;
  margin-left: 0px;
  padding-bottom: 4px;
  margin-bottom: 15px;
  border-radius: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6e7986;
  }
`;

const DrugCalendar = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Week = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Day = styled.div`
  width: 15%;
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;

  border-radius: 100%;

  border: none;
  margin: 9px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => (props.fontColor ? props.fontColor : "gray")};
  font-weight: 100;
  font-size: 18px;
  cursor: pointer;
`;

const DayDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;

  border-radius: 100%;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => (props.fontColor ? props.fontColor : "gray")};
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  border: none;
  margin: 9px;

  color: #6e7986;
  font-weight: 800;
`;

const WhenEat = styled.div`
  min-width: 22px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 4px;

  @media screen and (max-width: 768px) {
    min-width: 22px;
    display: flex;
    justify-content: space-around;
  }
`;

const WhenEatDot = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  font-size: 1px;
  font-weight: 800;
  background-color: ${(props) => props.bgColor};
`;

export default Calendar;
