import React, { useState } from "react";
import useInterval from "../hooks/useInterval";
import { dbService } from "../fbase";
import styled from "styled-components";
import dayjs from "dayjs";
import ProgressBar from "@ramonak/react-progress-bar";
import { motion, AnimatePresence } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const FeelingForm = ({}) => {
  // 이모지 순서
  const emojiArray = [
    "crying",
    "crying (1)",
    "smile",
    "smile (1)",
    "grinning",
    "neutral",
    "angry",
  ];

  // 시간
  const [stopwatchTime, setStopwatchTime] = useState(dayjs().format());
  const [dayProgress, setDayProgress] = useState(0);

  // onChange 텍스트와 이모지 변경
  const [text, setText] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState(emojiArray[5]);

  useInterval(() => {
    setStopwatchTime(dayjs().format());
    if (dayProgress < 100) {
      returnProgressPercent(dayProgress);
    }
  }, 1000);

  const onFeelingDataSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      time: dayjs(stopwatchTime).format(),
      text: text,
      feeling: currentEmoji,
    };

    await dbService.collection(`테스트`).add(submitData);
    setText("");
  };

  const returnProgressPercent = () => {
    let hour = dayjs(stopwatchTime).get("hour");
    let min = dayjs(stopwatchTime).get("minutes");
    let cal = hour * 60 + min; // 분자
    let progressPercent = ((cal / 1440) * 100).toFixed(2);
    setDayProgress(progressPercent);

    return progressPercent;
  };

  return (
    <AnimatePresence>
      {/* {drugClick && ( */}
      <FeelingFormDiv
      // layout
      // transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      // initial={{ height: "100%", opacity: 0, scale: 0.8 }}
      // animate={{ opacity: 1, scale: 1 }}
      // exit={{ height: "0%", scale: 0, opacity: 0 }}
      >
        {/* <TimeDiv>
          <p>{dayjs(stopwatchTime).format("HH시 mm분 ss초")}</p>
        </TimeDiv> */}
        <FormDiv onSubmit={onFeelingDataSubmit}>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            placeholder="현재 기분은?"
          />
        </FormDiv>
        <ProgressBarDiv>
          <ProgressBar
            completed={dayProgress}
            width={"100%"}
            height={"18px"}
            borderRadius={"7px"}
            bgColor={"#4448FF"}
            baseBgColor={"#f2f4f6"}
            customLabel={`${dayProgress}%`}
            labelAlignment={"right"}
            labelSize="13px"
            transitionDuration={"0.7s"}
            animateOnRender={true}
            margin={"0px 0px 8px 0px"}
          />
        </ProgressBarDiv>
        <EmojiDiv>
          {emojiArray.map((item, index) => (
            <EmojiBtn
              bottombordercolor={
                emojiArray[index] === currentEmoji ? "#e0e0de" : "white"
              }
              key={index}
              onClick={() => {
                setCurrentEmoji(emojiArray[index]);
              }}
            >
              <EmojiImg
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={require(`../icons/${item}.png`)}
              />
            </EmojiBtn>
          ))}
        </EmojiDiv>
      </FeelingFormDiv>

      {/* )} */}
    </AnimatePresence>
  );
};

const FeelingFormDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  min-height: 101px;
  max-width: 900px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 82%;
  }
`;

const TimeDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FormDiv = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;

  input {
    font-family: "Pretendard-Regular";
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
`;

const ProgressBarDiv = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const EmojiDiv = styled.div`
  width: 60%;
  min-height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const EmojiBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  padding-right: 0.7px;
  padding-bottom: 8px;
  border-bottom: 3px solid ${(props) => props.bottombordercolor};
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
`;

const EmojiImg = styled(motion.img)`
  width: 30px;
`;
export default FeelingForm;
