import { SyntheticEvent, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import fbico from "../images/icons8-facebook.png";
import googleico from "../images/icons8-google.png";
import hideico from "../images/icons8-invisible.png";
import showico from "../images/icons8-visibility.png";

import MyButton from "./common/Button";
import InputField from "./common/InputField";
import MessageBanner from "./common/MessageBanner";
import {
  FacebookUser,
  GoogleTokenObj,
  LoginCredentials,
  MessageInfo,
} from "../utils/types";
import userService from "../services/userService";
import authService from "../services/authService";
// import authService from "../services/authService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [logData, setLogData] = useState<LoginCredentials>({
    logincredential: "",
    password: "",
  });
  const [messageBanner, setMessageBanner] = useState<MessageInfo>({
    message: "",
    className: "",
  });

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setLogData({
      ...logData,
      logincredential: value,
    });
  };

  const handlePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLogData({
      ...logData,
      password: value,
    });
  };

  const login = async (event: SyntheticEvent) => {
    event.preventDefault();
    const logging = await userService.logUser(logData);
    console.log("logdata", logging);
    if (logging.token) {
      localStorage.setItem("music-token", logging.token);
      window.location.replace("/logged");
    }

    setMessageBanner(logging.messageBanner);
    setTimeout(() => {
      setMessageBanner({ message: "", className: "" });
    }, 6000);
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google token respo", tokenResponse);
      console.log("scope stuff", tokenResponse.scope.split(" ")[3]);

      const token = tokenResponse;

      const getResponse = async (token: GoogleTokenObj) => {
        const res = await authService.googleLogin(token);
        if (res.googleToken) {
          localStorage.setItem("music-token", res.googleToken);
          window.location.replace("/logged");
        }
        console.log("Google back", res);
      };

      getResponse(token);
    },
    onError: (error) => console.log("Google login error", error),
  });

  const fbLogin = async () => {
    FB.login(
      function (response) {
        console.log("FB LOGIN RESPONSE", response);
        FB.getLoginStatus((response) => {
          console.log("HIHUU", response);
        });
        if (response.status === "connected") {
          localStorage.setItem(
            "facebook-token",
            response.authResponse.accessToken
          );
          FB.api(
            "/me",
            {
              fields:
                "id,name,first_name,last_name,short_name,email,picture,gender",
            },
            async function (response) {
              const myInfo = (await response) as FacebookUser;

              console.log("MY info", myInfo.picture.data);

              const res = await authService.fbLogin(myInfo);
              if (res.fbToken) {
                localStorage.setItem("music-token", res.fbToken);
                window.location.replace("/logged");
              }
            }
          );
        } else {
          console.log("Error connecting Facebook.");
        }
        console.log("FB LOGIN", response);
      }
      // { scope: "email,user_friends" }
    );

    console.log("fb login res");
  };

  return (
    <div className="login-container">
      <div className="login-here">
        <h1>Login here!</h1>
        <div>Login with</div>
        <div className="oauth-logos">
          <div onClick={fbLogin}>
            <img src={fbico} alt="oauth" title="facebook" />
            <div>FACEBOOK</div>
          </div>
          <div
            onClick={() => {
              console.log("Google OAUTH");
              loginGoogle();
            }}
          >
            <img src={googleico} alt="oauth" title="facebook" />
            <div>GOOGLE</div>
          </div>
        </div>
        <div>or</div>
        <form onSubmit={login}>
          <div className="reg-fields">
            {/* USERNAME */}
            <div>
              <label htmlFor="log-user" style={{ marginTop: "1vh" }}>
                Email / Username
              </label>
              <InputField
                className="reg-input"
                type="text"
                value={logData.logincredential}
                autoComplete="off"
                required={true}
                name="log-user"
                id="log-user"
                placeholder="your email or username..."
                onChange={handleName}
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
                type={showPassword ? "text" : "password"}
                value={logData.password}
                autoComplete="off"
                required={true}
                name="log-pw"
                id="log-pw"
                placeholder="password..."
                onChange={handlePw}
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
            {messageBanner &&
              (messageBanner.className === "infoError" ||
                messageBanner.className === "infoOK") && (
                <MessageBanner
                  className={messageBanner.className}
                  message={messageBanner.message}
                />
              )}
            <div>
              <MyButton
                type="submit"
                className="myButton filledButton extra-button2"
                style={{
                  margin: "2vh 0",
                  padding: "1.5vh 0",
                  backgroundColor: "var(--primamid)",
                  color: "white",
                }}
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
