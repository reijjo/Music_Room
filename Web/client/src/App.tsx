import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPw from "./components/ForgotPw";

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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
