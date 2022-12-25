import React from "react";
import { authService } from "../fbase";
import styled from "styled-components";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const onLogOutBtnClick = () => {
    const logout = window.confirm("로그아웃 하시겠어요?");
    if (logout === true) {
      authService.signOut();
    }
  };
  return (
    <HeaderDiv>
      <a href="/">
        <img
          src={require("../icons/logo31.png")}
          width={"100px"}
          height={"31px"}
        />
      </a>
      <LogOutBtn onClick={onLogOutBtnClick}>
        <FontAwesomeIcon icon={faCircleUser} />
      </LogOutBtn>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: left;
  width: 75%;
  max-width: 960px;
  height: 42px;
  padding-left: 20px;
  padding-top: 10px;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding-left: 5px;
  }
`;

const LogOutBtn = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border: none;
  background: none;
  color: gray;
  font-size: 30px;
  width: 45px;
  height: 45px;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 14px;

  @media screen and (max-width: 768px) {
    justify-content: flex-end;
    font-size: 26px;
    padding-right: 3px;
    padding-top: 3px;
    margin-right: 0px;
  }
`;

export default Header;
