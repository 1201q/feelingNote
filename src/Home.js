import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { dbService, authService } from "./fbase";
import useInterval from "./hooks/useInterval";
import ProgressBar from "@ramonak/react-progress-bar";
import DrugInfo from "./DrugInfo";

import { motion, AnimatePresence } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function Home() {
  const emojiArray = [
    "crying",
    "crying (1)",
    "smile",
    "smile (1)",
    "grinning",
    "neutral",
    "angry",
  ];

  const [time, setTime] = useState(dayjs().format());
  const [stopwatchTime, setStopwatchTime] = useState(dayjs().format());
  const [dayProgress, setDayProgress] = useState(0);
  const [text, setText] = useState("");
  const [feelingData, setFeelingData] = useState([]);
  const [feelingtodayData, setFeelingtodayData] = useState([]);
  const [drugData, setDrugData] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState(emojiArray[4]);

  const [day, setDay] = useState(false);
  const [night, setNight] = useState(false);
  const [dayTime, setDaytime] = useState("");
  const [nightTime, setNighttime] = useState("");
  const [drugloading, setDrugLoading] = useState(false);

  //달력 만드는데씀
  const [current, setCurrent] = useState(dayjs());
  const [currentMonthOfdays, setCurrentMonthOfdays] = useState([]);

  useInterval(() => {
    setStopwatchTime(dayjs().format());

    if (dayProgress < 100) {
      returnProgressPercent(dayProgress);
    }
    // console.log(stopwatchTime);
  }, 1000);

  useEffect(() => {
    setDrugLoading(false);
    dbService
      .collection(`테스트`)
      .orderBy("time")
      .onSnapshot((s) => {
        const array = s.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeelingData(array);
        setFeelingtodayData(
          array.filter(
            (data) =>
              dayjs(data.time).format("YYYY-M-D") === dayjs().format("YYYY-M-D")
          )
        );
      });

    dbService
      .collection(`드러그`)
      .orderBy("dateID")
      .onSnapshot((d) => {
        const array = d.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dataSetInit(array);
      });
    ca();
  }, []);

  const dataSetInit = (array) => {
    const returnFilterDrugData = () => {
      return array.filter(
        (item) => item.dateID === dayjs().format("YYYY-M-D")
      )[0];
    };

    if (
      array.filter((item) => item.dateID === dayjs().format("YYYY-M-D"))
        .length === 0
    ) {
      //초기설정해야됨
      drugInit();
      console.log("초기설정!");
    } else {
      setDrugData(array);
      setDay(returnFilterDrugData().day);
      setNight(returnFilterDrugData().night);
      setDaytime(returnFilterDrugData().whenEatDrugAtDay);
      setNighttime(returnFilterDrugData().whenEatDrugAtNight);
      setDrugLoading(true);
    }
  };

  const drugInit = async () => {
    const drugData = {
      dateID: dayjs().format("YYYY-M-D"),
      day: false,
      night: false,
      whenEatDrugAtDay: "",
      whenEatDrugAtNight: "",
    };

    await dbService.collection(`드러그`).add(drugData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      time: dayjs(stopwatchTime).format(),
      text: text,
      feeling: currentEmoji,
    };

    await dbService.collection(`테스트`).add(submitData);
    setText("");
  };

  const onChange = (e) => {
    if (e.target.name === "text") {
      setText(e.target.value);
    } else if (e.target.name === "time") {
      setTime(e.target.value);
    }
  };

  const returnProgressPercent = () => {
    let hour = dayjs(stopwatchTime).get("hour");
    let min = dayjs(stopwatchTime).get("minutes");
    let cal = hour * 60 + min;
    let result = ((cal / 1440) * 100).toFixed(2);
    setDayProgress(((cal / 1440) * 100).toFixed(2));

    return result;
  };

  const ca = (plusOrMinus = current) => {
    let endOFmonth = Number(plusOrMinus.endOf("month").format("D"));
    const grid = Array(endOFmonth)
      .fill()
      .map((arr, i) => {
        return i + 1;
      });

    setCurrentMonthOfdays(grid);
  };

  const onLogOutClick = () => {
    authService.signOut();
  };

  return (
    <div className="App">
      {/* 회색 */}

      <Header>
        <HeaderDiv>
          <img src={require("./icons/logo3.png")} width={"140px"} />{" "}
        </HeaderDiv>
      </Header>

      <AddBar>
        <AddBarDiv bgColor="white">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{dayjs(stopwatchTime).format("HH시 mm분 ss초")}</p>
            <LogOutBtn onClick={onLogOutClick}>로그아웃</LogOutBtn>
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="text"
              onChange={onChange}
              value={text}
              placeholder="현재 기분은?"
            />
          </form>{" "}
          <div
            style={{
              width: "100%",
              marginBottom: "30px",
            }}
          >
            <ProgressBar
              completed={dayProgress}
              width={"100%"}
              height={"18px"}
              borderRadius={"7px"}
              customLabel={`${dayProgress}%`}
              labelAlignment={"right"}
              labelSize="13px"
              bgColor={"#4448FF"}
              baseBgColor={"#f2f4f6"}
              transitionDuration={"0.7s"}
              animateOnRender={true}
              margin={"0px 0px 8px 0px"}
            />
          </div>
          <SideabarDiv>
            {emojiArray.map((item, index) => (
              <SidebarEmojiBtn
                style={{
                  borderColor:
                    emojiArray[index] === currentEmoji ? "#e0e0de" : "white",
                }}
                onClick={() => {
                  console.log(emojiArray[index] === currentEmoji);
                  console.log(index);
                  console.log(currentEmoji);
                  setCurrentEmoji(emojiArray[index]);
                }}
              >
                <SidebarImg
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  src={require(`./icons/${item}.png`)}
                  width="30px"
                />
              </SidebarEmojiBtn>
            ))}
          </SideabarDiv>
        </AddBarDiv>
        {/*  */}
        {drugloading ? (
          <DrugInfo
            DrugData={drugData}
            drugloading={drugloading}
            Day={day}
            Night={night}
            DayTime={dayTime}
            NightTime={nightTime}
          />
        ) : (
          <AddBarDiv
            sibal="smooth"
            bgColor="white"
            style={{ marginBottom: "20px", paddingBottom: "29px" }}
          ></AddBarDiv>
        )}

        <AddBarDiv
          sibal="smooth"
          bgColor="white"
          style={{ alignItems: "flex-start" }}
        >
          <AddBarHeader>시간순</AddBarHeader>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {feelingtodayData.map((data, index) => (
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
                  <p>{data.text}</p>
                </div>
                <TodayFeelingListTime>
                  {dayjs(data.time).format("HH시 mm분")}
                </TodayFeelingListTime>
              </TodayFeelingList>
            ))}
          </div>
        </AddBarDiv>
      </AddBar>
    </div>
  );
}

const LogOutBtn = styled.button`
  border: none;
  font-size: 7px;
  width: 70px;
  height: 20px;
  cursor: pointer;
  border-radius: 10px;
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 0px;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 70%;
  max-width: 940px;
  height: 60px;
  margin-right: 35px;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const AddBar = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;

  p {
    width: 100%;
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    text-align: left;
    font-weight: 500;
  }

  form {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;

    input {
      width: 100%;
      padding: 12px 12px;
      font-size: 25px;
      font-weight: 200;
      background: none;
      border: none;
      outline: none;
      border-radius: 10px;
      text-align: center;
      color: #333d4b;
      background-color: #f2f4f6;
    }

    input::placeholder {
      font-weight: 200;
    }
  }
`;

const AddBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 900px;
  min-height: 101px;
  background-color: ${(props) => props.bgColor};
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const AddBarHeader = styled.div`
  font-family: "SUIT Variable", sans-serif;
  font-weight: 900;
  width: 100%;
  color: #333d4b;
  font-size: 27px;

  margin-left: 0px;
  margin-bottom: 2px;
  text-align: left;
`;

const TodayFeelingList = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 13px 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  /* border-bottom: 0.6px solid rgb(214, 214, 214, 0.6); */

  p {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    font-weight: 900;
    font-size: 17px;
  }
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

const SideabarDiv = styled.div`
  width: 60%;
  min-height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const SidebarImg = styled(motion.img)``;

const SidebarEmojiBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  padding-right: 0.7px;
  padding-bottom: 8px;

  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  border-bottom: 3px solid ${(props) => props.borderColor};
`;

const SidebarEmojiNormalBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  padding-right: 0.7px;
  padding-bottom: 8px;

  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  border-bottom: 3px solid ${(props) => props.borderColor};
`;

const WrapVertical = styled.div`
  width: 100%;

  height: 70px;
  overflow: auto;
  white-space: nowrap;
  overflow: scroll;

  button {
    width: 13%;
    height: 50%;
    border: none;
    margin-right: 5px;
    font-size: 21px;
    font-weight: 100;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
  }
`;

export default Home;
