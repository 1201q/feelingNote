import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const FLcomponent = ({ data, index }) => {
  return (
    <FLcomponentDiv>
      <Component>
        <ComponentImg src={require(`../icons/${data.feeling}.png`)} />
        {data.text}
      </Component>
      <FLcomponentTime>{dayjs(data.time).format("HH시 mm분")}</FLcomponentTime>
    </FLcomponentDiv>
  );
};

const FLcomponentDiv = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 13px 0px;
  font-weight: 800;
  font-size: 17px;
`;

const Component = styled.div`
  display: flex;
  align-items: center;
`;

const ComponentImg = styled.img`
  width: 30px;
  margin-right: 10px;
`;

const FLcomponentTime = styled.div`
  text-align: center;
  min-width: 65px;
  background-color: #f2f4f6;
  border-radius: 10px;
  padding: 6px 6px;
  margin-left: 2px;
  font-weight: 800;
  font-size: 13px;
`;

export default FLcomponent;
