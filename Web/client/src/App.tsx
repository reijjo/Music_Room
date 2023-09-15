import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <Router>
      <div id="main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
