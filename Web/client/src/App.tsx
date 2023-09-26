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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("music-token");

    const verifiedToken = async (token: string) => {
      try {
        const res = await userService.getToken(token);
        setUser(res.tokenUser);
        console.log("Verifytoken res", res);
      } catch (error) {
        console.log("Error verifying token", error);
        setToken(null);
        setUser(null);
        localStorage.removeItem("music-token");
      }
    };

    if (storedToken) {
      setToken(storedToken);
      verifiedToken(storedToken);
    }
  }, [token]);

  console.log("APP.TSX user", user);

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
      </div>
      <Footer />
    </Router>
  );
};

export default App;
