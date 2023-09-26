import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "./components/HomePage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPw from "./components/ForgotPw";
import Verify from "./components/Verify";
import Logged from "./components/Logged";
import userService from "./services/userService";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("music-token");

    const verifiedToken = async (token: string) => {
      const res = await userService.getToken(token);
      setUser(res.tokenUser);
      console.log("Verifytoken res", res);
    };

    if (token) {
      verifiedToken(token);
    }
  }, []);

  console.log("APP.TSX user", user);

  return (
    <Router>
      <div id="main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpw" element={<ForgotPw />} />
          <Route path="/:code/verify" element={<Verify />} />
          <Route path="/logged" element={<Logged />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
