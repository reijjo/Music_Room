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
import MyButton from "./components/common/Button";
import userService from "./services/userService";
import authService from "./services/authService";
import { DecodedToken } from "./utils/types";
import Settings from "./components/Settings";
// import RefreshToken from "./components/common/RefreshToken";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [showTokenRefresh, setShowTokenRefresh] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const checkTokenExpiration = () => {
    if (decodedToken) {
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const remaining = expirationTime - currentTime;

      setTimeRemaining(remaining);
      console.log("remaining", timeRemaining);

      if (remaining <= 0) {
        console.log("token has expired");
        setUser(null);
        localStorage.removeItem("music-token");

        window.location.replace("/");
      }
    }
  };

  // Token verification

  const verifiedToken = async (token: string) => {
    try {
      const res = await userService.getToken(token);
      if (res) {
        console.log("TOKEN RES");
        setUser(res.tokenUser);
        setDecodedToken(res.tokenData);
      }

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

  useEffect(() => {
    const storedToken = localStorage.getItem("music-token");

    if (storedToken) {
      setToken(storedToken);
      if (
        window.location.pathname === "/logged" ||
        window.location.pathname === "/settings"
      ) {
        verifiedToken(storedToken);
      }
    }
  }, [token]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      checkTokenExpiration();
      if (timeRemaining !== null && timeRemaining <= 10 * 60 * 1000) {
        setShowTokenRefresh(true);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(timeInterval);
  }, [decodedToken, timeRemaining]);

  // for refresh token
  const handleTokenRefresh: () => void = async () => {
    const storedToken = localStorage.getItem("music-token");

    if (storedToken) {
      try {
        const res = await authService.refreshToken(storedToken);
        console.log("refresh token res", res);
        localStorage.setItem("music-token", res.newToken);
        setToken(res.newToken);
        setTimeRemaining(15 * 60 * 1000);
        setShowTokenRefresh(false);
      } catch (error) {
        console.log("Error refreshing token", error);
      }
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "var(--white)",
      backgroundColor: "var(--prima)",
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
          <Route
            path="/settings"
            element={user ? <Settings user={user} /> : <Login />}
          />
          <Route path="*" element={<Homepage />} />
        </Routes>

        {/* Token going to expire */}

        <Modal
          style={customStyles}
          isOpen={showTokenRefresh}
          onRequestClose={() => setShowTokenRefresh(false)}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
          contentLabel="Want to stay logged in?"
        >
          <h2>Still here?</h2>
          <MyButton
            className="myButton outlinedButton"
            type="button"
            onClick={handleTokenRefresh}
          >
            Yup!
          </MyButton>
          <MyButton
            style={{ color: "white" }}
            className="myButton textButton"
            onClick={() => setShowTokenRefresh(false)}
          >
            nope.
          </MyButton>
        </Modal>
      </div>
      {!user ? <Footer /> : null}
    </Router>
  );
};

export default App;
