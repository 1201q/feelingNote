import Drug from "../Components/Drug";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
import DrugList from "../Components/DrugList";

const Druginfo = ({ allDrugData, todayDrugData, drugloading }) => {
  return (
    <Main>
      <Drug
        todayDrugData={todayDrugData}
        Drugloading={drugloading}
        layoutId="title1"
      />
      <DrugList allDrugData={allDrugData} />
    </Main>
  );
};

const Main = styled(motion.div)`
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
`;

export default Druginfo;
