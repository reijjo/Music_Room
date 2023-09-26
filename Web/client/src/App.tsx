import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPw from "./components/ForgotPw";
import Verify from "./components/Verify";
import Logged from "./components/Logged";

const App = () => {
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
