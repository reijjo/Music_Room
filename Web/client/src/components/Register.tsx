import { Link } from "react-router-dom";
import googleico from "../images/icons8-google.png";
import fbico from "../images/icons8-facebook.png";

const Register = () => {
  return (
    <div className="register-main">
      <h2>Register here!</h2>
      <div className="got-account">
        <div style={{ marginRight: "1vw" }}>Already have an account?</div>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "var(--primamid)",
            fontWeight: "800",
          }}
        >
          Log in!
        </Link>
      </div>
      <div className="oauth-reg">
        <div
          style={{ padding: "0.1vh", textAlign: "center", marginTop: "4px" }}
        >
          Register with
        </div>
        <div className="oauth-logos">
          <div onClick={() => console.log("Facebook OAUTH")}>
            <img src={fbico} alt="oauth" title="facebook" />
            <div>FACEBOOK</div>
          </div>
          <div onClick={() => console.log("Google OAUTH")}>
            <img src={googleico} alt="oauth" title="facebook" />
            <div>GOOGLE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
