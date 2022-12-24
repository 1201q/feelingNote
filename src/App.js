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
      if (user) {
        setIsLoggedIn(true);
        setUserData({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setIsLoggedIn(false);
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
            marginTop: "50px",
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
