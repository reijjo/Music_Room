import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
