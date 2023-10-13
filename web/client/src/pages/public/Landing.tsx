import { Link } from "react-router-dom";
import deez from "../../assets/images/deezerlogos/Logotype/DIGITAL RGB/PNG/Colored_Full_White@2x.png";
import MyButton from "../../components/MyButton";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="deezer-stuff">
        <img src={deez} alt="deezer-logo" />
        <div>presents:</div>
      </div>
      <div className="big-logo">
        <div className="big-logo-text">Music Room</div>
        <div style={{ transform: "rotate(20deg" }}>
          The place where you can stream music like a maniac.
        </div>
      </div>
      <div>
        <Link to="/register">
          <MyButton
            className="my-button text-button"
            style={{
              padding: "0",
              margin: "0",
              fontSize: "inherit",
              // textDecoration: "underline",
            }}
          >
            Click here to get started!
          </MyButton>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
