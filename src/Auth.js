import React, { useEffect, useState } from "react";
import { authService, firebaseInstance } from "./fbase";
import { Link } from "react-router-dom";
const Auth = () => {
  const onClick = async (e) => {
    let provider;

    provider = new firebaseInstance.auth.GoogleAuthProvider();

    const data = await authService.signInWithPopup(provider);
    console.log(data);
    console.log(data.user.uid);
  };
  return (
    <div>
      <button onClick={onClick}>
        <Link to="/">로그인</Link>
      </button>
    </div>
  );
};

export default Auth;
