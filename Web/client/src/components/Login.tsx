import { useState } from "react";

import fbico from "../images/icons8-facebook.png";
import googleico from "../images/icons8-google.png";
import hideico from "../images/icons8-invisible.png";
import showico from "../images/icons8-visibility.png";

import MyButton from "./common/Button";
import InputField from "./common/InputField";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-here">
        <h1>Login here!</h1>
        <div>Login with</div>
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
        <div>or</div>
        <form>
          <div className="reg-fields">
            {/* USERNAME */}
            <div>
              <label htmlFor="log-user" style={{ marginTop: "1vh" }}>
                Email / Username
              </label>
              <InputField
                className="reg-input"
                type="text"
                // value={regData.email}
                // value="hohii"
                autoComplete="off"
                required={true}
                name="log-user"
                id="log-user"
                placeholder="your email or username..."
                // onChange={handleEmail}
                onFocus={() => {
                  // setEmailValidFocus(true);
                }}
                onBlur={() => {
                  // setEmailValidFocus(false);
                }}
              />
            </div>
            {/* PASSWORD */}
            <div style={{ position: "relative" }}>
              <label htmlFor="log-pw" style={{ marginTop: "1vh" }}>
                Password
              </label>
              <InputField
                className="reg-input"
                type="password"
                // value={regData.email}
                // value="hohii"
                autoComplete="off"
                required={true}
                name="log-pw"
                id="log-pw"
                placeholder="password..."
                // onChange={handleEmail}
                onFocus={() => {
                  // setEmailValidFocus(true);
                }}
                onBlur={() => {
                  // setEmailValidFocus(false);
                }}
              />
              <div
                className="show-pw-icon"
                style={{ top: "55%" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img src={hideico} alt="show" title="hide password" />
                ) : (
                  <img src={showico} alt="hide" title="show password" />
                )}
              </div>
            </div>
            <div>
              <MyButton
                className="myButton filledButton extra-button"
                style={{ margin: "2vh 0", padding: "1.5vh 0" }}
              >
                Login!
              </MyButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
