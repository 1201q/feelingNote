import React from "react";
import Router from "./Router";
import { useEffect, useState } from "react";
import { authService } from "./fbase";
import { Orbit } from "@uiball/loaders";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
        setLoading(true);
        return;
      } else {
        setUserData({
          displayName: user.displayName,
          uid: user.uid,
        });
      }

      if (
        user.uid === process.env.REACT_APP_GOOGLE_LOGIN_UID ||
        user.uid === process.env.REACT_APP_GITHUB_LOGIN_UID
      ) {
        setIsLoggedIn(true);
        console.log("허가된 계정");
      } else {
        setIsLoggedIn(false);
        window.alert("허가된 계정이 아니에요.");
        console.log("허가되지 않은 계정");
      }
      setLoading(true);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Router isLoggedIn={isLoggedIn} userData={userData} />
      ) : (
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Orbit size={35} color="#231F20" />
        </div>
      )}
    </div>
  );
};

export default App;
