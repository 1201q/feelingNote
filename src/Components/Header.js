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
      <a href="/feelingNote">
        <HeaderImg src={require("../icons/헤더.png")} />
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
  align-items: flex-start;
  width: 75%;
  max-width: 960px;
  height: 42px;
  padding-left: 20px;
  padding-top: 10px;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding-left: 2px;
  }

  a {
    -webkit-tap-highlight-color: transparent;
  }
`;

const HeaderImg = styled.img`
  width: 130px;

  @media screen and (max-width: 768px) {
    width: 112px;
    margin-top: 3px;
  }
`;

const LogOutBtn = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border: none;
  background: none;
  color: #b0b8c1;
  font-size: 30px;
  width: 45px;
  height: 45px;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 14px;
  -webkit-tap-highlight-color: transparent;

  @media screen and (max-width: 768px) {
    justify-content: flex-end;
    font-size: 26px;
    padding-right: 3px;
    padding-top: 3px;
    margin-right: 0px;
  }
`;

export default Header;
