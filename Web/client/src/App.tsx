import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Homepage from "./components/HomePage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPw from "./components/ForgotPw";
import Verify from "./components/Verify";
import Logged from "./components/Logged";
import userService from "./services/userService";
import authService from "./services/authService";
import { DecodedToken } from "./utils/types";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [showTokenRefresh, setShowTokenRefresh] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("music-token");

    const verifiedToken = async (token: string) => {
      try {
        const res = await userService.getToken(token);
        setUser(res.tokenUser);
        setDecodedToken(res.tokenData);

        console.log("Verifytoken res", res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data.message);
        } else {
          console.log("Error verifying token", error);
        }
        setToken(null);
        setUser(null);
        localStorage.removeItem("music-token");
      }
    };

    if (storedToken) {
      setToken(storedToken);
      if (window.location.pathname === "/logged") {
        verifiedToken(storedToken);
      }
    }
  }, [token]);

  useEffect(() => {
    // console.log("Decoded222222", decodedToken);

    const checkTokenExpiration = () => {
      if (decodedToken) {
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const remaining = expirationTime - currentTime;

        setTimeRemaining(remaining);
        console.log("remaining", timeRemaining);

        if (remaining <= 0) {
          console.log("token has expired");
          window.location.replace("/");
        }
      }
    };

    // checkTokenExpiration();

    // const timeInterval = setInterval(checkTokenExpiration, 5 * 1000);
    const timeInterval = setInterval(() => {
      checkTokenExpiration();
      if (timeRemaining !== null && timeRemaining <= 30 * 1000) {
        setShowTokenRefresh(true);
      }
    }, 5 * 1000);

    return () => clearInterval(timeInterval);
  }, [decodedToken, timeRemaining]);

  // for refresh token
  useEffect(() => {
    const storedToken = localStorage.getItem("music-token");

    const refreshToken = async (token: string) => {
      try {
        const res = await authService.refreshToken(token);
        console.log("AUTH SERVEI", res);
      } catch (error) {
        console.log("refreshToken error", error);
      }
    };

    if (storedToken) {
      refreshToken(storedToken);
    }
  }, [showTokenRefresh]);

  const handleTokenRefresh = () => {
    console.log("something with the token");
  };

  // if (user) {
  //   console.log("APP.TSX user", user);
  // }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Router>
      <div id="main">
        {!user ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={user ? <Logged user={user} /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpw" element={<ForgotPw />} />
          <Route path="/:code/verify" element={<Verify />} />
          <Route
            path="/logged"
            element={user ? <Logged user={user} /> : <Login />}
          />
        </Routes>
        <Modal
          style={customStyles}
          isOpen={showTokenRefresh}
          onRequestClose={() => setShowTokenRefresh(false)}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
          contentLabel="Want to stay logged in?"
        >
          <h2>Your session is about to expire!</h2>
          <p>Refresh session?</p>
          <button onClick={handleTokenRefresh}>Refresh</button>
          <button onClick={() => setShowTokenRefresh(false)}>no thanks</button>
        </Modal>
      </div>
      {!user ? <Footer /> : null}
    </Router>
  );
};

export default App;
