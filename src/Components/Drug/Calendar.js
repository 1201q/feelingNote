import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, useScroll } from "framer-motion";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Calendar = () => {
  const today = dayjs();
  const thisMonthStart = today.startOf("month");
  const thisMonthEnd = today.endOf("month"); //월요일이 0 일요일이 6

  const [selectDay, setSelectDay] = useState(today);
  const [selectMonthStart, setSelectMonthStart] = useState(thisMonthStart);
  const [selectMonthEnd, setSelectMonthEnd] = useState(thisMonthEnd);

  let arr = [];
  let CalenDate = ["일", "월", "화", "수", "목", "금", "토"];

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
  };

  const calenar = () => {
    let todaybgcolor = false;
    if (today.get("month") === selectDay.get("month")) {
      todaybgcolor = true;
    }

    let calen = [];
    let weekarr = [];
    makeArr();

    for (let i = 0; i < 7; i++) {
      weekarr.push(<DateHeader>{CalenDate[i]}</DateHeader>);
    }
    calen.push(<Week>{weekarr}</Week>);
    weekarr = [];

    for (let i = 0; i <= arr.length + 7; i++) {
      if (i % 7 === 0 && i !== 0) {
        calen.push(<Week>{weekarr}</Week>);
        weekarr = [];
        weekarr.push(
          <Day
            bgColor={arr[i] === today.get("date") && "red"}
            fontColor={arr[i] === today.get("date") && "white"}
          >
            {arr[i]}
          </Day>
        );
      } else {
        weekarr.push(
          <Day
            bgColor={arr[i] === today.get("date") && todaybgcolor && "red"}
            fontColor={arr[i] === today.get("date") && "white"}
          >
            {arr[i]}
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100%;

  border: none;
  margin: 9px;

  color: ${(props) => (props.fontColor ? props.fontColor : "lightgray")};
  font-weight: 100;
  font-size: 14px;
  cursor: pointer;
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

export default Calendar;
