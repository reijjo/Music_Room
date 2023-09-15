import deezerLogo from "../images/PNG/Colored_Full_Black@2x.png";
import equalizer from "../images/kassu2.png";
import { Link } from "react-router-dom";
import MyButton from "./common/Button";

const Homepage = () => {
  return (
    <>
      <div className="home-logos">
        <div className="home-welcome">
          <div className="deezer-presents">
            <img src={deezerLogo} alt="deezer-logo" title="deezer" />
            <div>presents:</div>
          </div>
          <div className="musicroom-logo">
            <img src={equalizer} alt="musicroom-logo" title="MusicRoom" />
            <div>Music Room</div>
          </div>
          <p
            style={{
              margin: "0",
              textAlign: "end",
              marginRight: "2vw",
              fontSize: "18px",
              color: "var(--text)",
            }}
          >
            The place where you can stream music like a maniac!
          </p>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: "2vh" }}
      >
        <Link to="/register">
          <MyButton className="myButton filledButton">
            Click here to join!
          </MyButton>
        </Link>
      </div>
    </>
  );
};

export default Homepage;
