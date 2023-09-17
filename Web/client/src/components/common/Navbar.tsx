import MyButton from "./Button";
import cassette from "../../images/kassu2.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="nav-logo">
          <img src={cassette} alt="logo" title="musicroom" />
          <div>Music Room</div>
        </div>
      </Link>
      <div>
        <Link to="/login">
          <MyButton className="myButton textButton" style={{ color: "white" }}>
            Login
          </MyButton>
        </Link>
        <Link to="/register">
          <MyButton className="myButton outlinedButton">Sign up!</MyButton>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
