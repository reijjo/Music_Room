import { Link } from "react-router-dom";
import googleico from "../images/icons8-google.png";
import fbico from "../images/icons8-facebook.png";
import InputField from "./common/InputField";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailValidFocus, setEmailValidFocus] = useState(false);
  const [emailValidMsg, setEmailValidMsg] = useState<null | string>(null);

  const [username, setUsername] = useState("");
  const [usernameLenFocus, setUsernameLenFocus] = useState(false);
  const [usernameLenMsg, setUsernameLenMsg] = useState<null | string>(null);
  const [usernameValidFocus, setUsernameValidFocus] = useState(false);
  const [usernameValidMsg, setUsernameValidMsg] = useState<null | string>(null);

  // HANDLERS
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmail(value);

    if (!emailRegex.test(value)) {
      setEmailValidMsg("Use a valid email, thanks.");
    } else {
      setEmailValidMsg(null);
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const nameRegex = /^[a-zA-Z0-9!._\-@#*$]+$/;
    setUsername(value);

    if (value.length < 3 || value.length > 30) {
      setUsernameLenMsg("3-30 characters");
    } else {
      setUsernameLenMsg(null);
    }

    if (!nameRegex.test(value)) {
      setUsernameValidMsg("Only alphanumeric and (!._-@#*$)");
    } else {
      setUsernameValidMsg(null);
    }
    console.log("username", value);
  };

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
        <div style={{ textAlign: "center" }}>or</div>
        <form>
          <div className="reg-fields">
            {/* EMAIL */}
            <label htmlFor="email" style={{ marginTop: "0" }}>
              Email
            </label>
            <InputField
              className="reg-input"
              type="email"
              value={email}
              autoComplete="off"
              required={true}
              name="email"
              id="email"
              onChange={handleEmail}
              onFocus={() => {
                setEmailValidFocus(true);
              }}
              onBlur={() => {
                setEmailValidFocus(false);
              }}
            />
            {emailValidFocus && emailValidMsg && (
              <div className="regmsg">
                <li>{emailValidMsg}</li>
              </div>
            )}

            {/* USERNANME */}
            <label htmlFor="username">Username</label>
            <InputField
              className="reg-input"
              type="text"
              value={username}
              autoComplete="off"
              required={true}
              name="username"
              id="username"
              onChange={handleUsername}
              onFocus={() => {
                setUsernameLenFocus(true);
                setUsernameValidFocus(true);
              }}
              onBlur={() => {
                setUsernameLenFocus(false);
                setUsernameValidFocus(false);
              }}
            />
            {usernameLenFocus && usernameLenMsg && (
              <div className="regmsg">
                <li>{usernameLenMsg}</li>
              </div>
            )}
            {usernameValidFocus && usernameValidMsg && (
              <div className="regmsg">
                <li>{usernameValidMsg}</li>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
