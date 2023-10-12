import MyButton from "./MyButton";

import whitecas from "../assets/images/whitecas.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" title="home">
        <div className="nav-left">
          <img src={whitecas} alt="logo" height="50px" />
          <div style={{ fontFamily: "MilgranItalic" }}>Music Room</div>
        </div>
      </Link>
      <div className="nav-right">
        <Link to="/login">
          <MyButton className="my-button text-button">Login</MyButton>
        </Link>
        <Link to="/register">
          <MyButton className="my-button filled-button">Register</MyButton>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
