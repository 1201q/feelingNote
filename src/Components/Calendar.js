import dayjs from "dayjs";
import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Calendar = () => {
  const today = dayjs("2023-01-01");
  // add select
  const thisMonthStart = today.startOf("month");
  // select

  const thisMonthEnd = today.endOf("month"); //월요일이 0 일요일이 6
  // select

  const F = (param, format) => {
    return Number(param.format(format));
  };

  // console.log(dayjsFomatting(thisMonthStart, "d"));
  // console.log(dayjsFomatting(thisMonthEnd, "d"));

  /////////////////
  let arr = [];
  let CalenDate = ["일", "월", "화", "수", "목", "금", "토"];

  const makeArr = () => {
    //앞에 공백 추가
    Array(F(thisMonthStart, "d"))
      .fill(" ")
      .map((i) => {
        arr.push(i);
      });

    for (let i = F(thisMonthStart, "DD"); i <= F(thisMonthEnd, "DD"); i++) {
      arr.push(i);
    }
  };

  /////////////////////
  const calenar = () => {
    let calen = [];
    let weekarr = [];
    makeArr();
    console.log(arr);
    console.log(arr.length);

    for (let i = 0; i < 7; i++) {
      weekarr.push(<DateHeader>{CalenDate[i]}</DateHeader>);
    }
    calen.push(<Week>{weekarr}</Week>);
    weekarr = [];

    for (let i = 0; i <= arr.length + 7; i++) {
      if (i % 7 === 0 && i !== 0) {
        calen.push(<Week>{weekarr}</Week>);
        weekarr = [];
        weekarr.push(<Day>{arr[i]}</Day>);
      } else {
        weekarr.push(<Day>{arr[i]}</Day>);
      }
    }

    return calen;
  };

  const onClick = (addORminus) => {
    today.add(addORminus, "month");
    console.log(today);
  };

  return (
    <CalendarDiv>
      <Header>
        {F(today, "YY")}년 {F(today, "M")}월
      </Header>
      <DrugCalendar>{calenar()}</DrugCalendar>
      <span>
        <button
          onClick={() => {
            onClick(-1);
          }}
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            onClick(1);
          }}
        >
          {">"}
        </button>
      </span>
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
  max-width: 70px;
  height: 45px;

  border: none;
  padding: 0;
  margin: 0;
  color: lightgray;
  font-weight: 100;
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  max-width: 70px;
  height: 45px;
  border: none;
  padding: 0;
  margin: 0;
  color: #6e7986;
  font-weight: 800;
`;

export default Calendar;
