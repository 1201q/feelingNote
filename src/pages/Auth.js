import React from "react";
import { authService, firebaseInstance } from "../fbase";
import styled from "styled-components";

const Auth = () => {
  const loginGoogle = async () => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  const loginGithub = async () => {
    let provider = new firebaseInstance.auth.GithubAuthProvider();
    await authService.signInWithPopup(provider);
  };
  return (
    <AuthDiv>
      <AuthImg src={require("../icons/로그인헤더아이콘.png")} />
      <AuthBtn onClick={loginGoogle}>Google 로그인</AuthBtn>
      <AuthBtn onClick={loginGithub}>Github 로그인</AuthBtn>
    </AuthDiv>
  );
};

const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const AuthImg = styled.img`
  margin-bottom: 50px;
  width: 300px;
`;

const AuthBtn = styled.button`
  font-family: "Pretendard-Regular";
  cursor: pointer;
  width: 50%;
  max-width: 250px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 900;
  background-color: #3b3d3f;
  color: white;
  margin-bottom: 10px;
  padding: 10px;

  &:hover {
    transition: 0.2s;
    background-color: #0077ff;
  }
`;

export default Auth;
