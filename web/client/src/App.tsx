import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import { useEffect, useState } from "react";
import usersRouter from "./api/users";
import { UserFull } from "./utils/types";

const App = () => {
  // const [users, setUsers] = useState<UserFull[]>([]);

  // useEffect(() => {
  //   const allUsers = () => {
  //     const res = usersRouter.getUsers();
  //     console.log("USERS RESPONNSEE", res);
  //   };
  //   allUsers();
  // });

  return (
    <div className="wrapper">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
