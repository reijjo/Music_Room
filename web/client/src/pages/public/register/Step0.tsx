import { Link } from "react-router-dom";
import MyButton from "../../../components/MyButton";

import fb from "../../../assets/images/ico-fb.png";
import google from "../../../assets/images/ico-google.png";

interface Props {
  toNextStep: () => void;
}

const Step0 = ({ toNextStep }: Props) => {
  return (
    <div className="got-account">
      <div style={{ color: "var(--primarylight)" }}>
        Already got an account?{" "}
        <Link to="/login">
          <MyButton className="my-button text-button" style={{ margin: "0" }}>
            Log in!
          </MyButton>
        </Link>
      </div>
      <div className="div-with-line">
        <span>or</span>
      </div>
      <div className="oauth-regs">
        <div onClick={() => console.log("Facebook login")}>
          {" "}
          <img src={fb} alt="fb" />
          Login with Facebook
        </div>
        <div onClick={() => console.log("Google login")}>
          <img src={google} alt="google" />
          Login with Google
        </div>
      </div>
      <div className="div-with-line">
        <span>or</span>
      </div>
      <MyButton
        className="my-button filled-button"
        style={{ padding: "0.5rem 1rem" }}
        onClick={toNextStep}
      >
        Register with email
      </MyButton>
    </div>
  );
};

export default Step0;
