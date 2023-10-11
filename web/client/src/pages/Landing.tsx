import deez from "../assets/images/deezerlogos/Logotype/DIGITAL RGB/PNG/Colored_Full_White@2x.png";

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
    </div>
  );
};

export default Landing;
