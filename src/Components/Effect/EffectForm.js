import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { dbService } from "../../fbase";

const EffectForm = ({ todayDrugData }) => {
  const [sideEffectText, setSideEffectText] = useState("");

  const onSideEffectDataSubmit = async (e) => {
    e.preventDefault();
    const data = {
      sideEffect: sideEffectText,
    };

    await dbService.doc(`드러그/${todayDrugData.id}`).update(data);
    setSideEffectText("");
  };
  const history = useHistory();
  return (
    <EffectFormDiv layoutId="effect">
      <Header
        onClick={() => {
          history.push("/effect");
        }}
        whileHover={{ scale: 1.0, background: "white " }}
        whileTap={{
          scale: 0.98,
          background: "rgba(176,184,193, 0.1)",
        }}
        transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
      >
        상태
      </Header>
      <FormDiv onSubmit={onSideEffectDataSubmit}>
        <input
          type="text"
          placeholder="오늘의 상태를 작성해주세요."
          value={sideEffectText}
          onChange={(e) => {
            setSideEffectText(e.target.value);
          }}
        />
      </FormDiv>
      {todayDrugData.sideEffect && (
        <MyTodaySideEffect
          onClick={() => {
            setSideEffectText(todayDrugData.sideEffect);
          }}
        >
          <div style={{ marginRight: "10px" }}></div>
          {todayDrugData.sideEffect && todayDrugData.sideEffect}
        </MyTodaySideEffect>
      )}
    </EffectFormDiv>
  );
};

const Header = styled(motion.div)`
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
  cursor: pointer;
`;

const EffectFormDiv = styled(motion.div)`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const FormDiv = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  input {
    font-family: "Pretendard-Regular";
    width: 100%;
    padding: 12px 12px;
    font-size: 18px;
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

const MyTodaySideEffect = styled.div`
  display: flex;
  width: 100%;
  text-align: left;
  min-width: 65px;
  background-color: #f2f4f6;
  border-radius: 10px;
  padding: 8px 0px;
  font-weight: 800;
  font-size: 18px;
  margin-top: 15px;
  cursor: pointer;
`;

export default EffectForm;
