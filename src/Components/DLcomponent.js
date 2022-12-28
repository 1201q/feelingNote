import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DLcomponent = ({ data, index }) => {
  return (
    <DLcomponentDiv>
      <Component>{data.dateID}</Component>
    </DLcomponentDiv>
  );
};

const DLcomponentDiv = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: red;
  border-radius: 10px;
  padding: 13px 0px;
  font-weight: 800;
  font-size: 17px;
`;

const Component = styled.div`
  display: flex;
  align-items: center;
`;

export default DLcomponent;
