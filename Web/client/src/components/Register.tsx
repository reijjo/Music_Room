import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { Gender, RegisterData } from "../utils/types";
import InputField from "./common/InputField";
import MyButton from "./common/Button";

import fbico from "../images/icons8-facebook.png";
import googleico from "../images/icons8-google.png";

const Register = () => {
  const [regData, setRegdata] = useState<RegisterData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: Gender.Choose,
  });

  // const [email, setEmail] = useState("");
  const [emailValidFocus, setEmailValidFocus] = useState(false);
  const [emailValidMsg, setEmailValidMsg] = useState<null | string>(null);

  // const [username, setUsername] = useState("");
  const [usernameLenFocus, setUsernameLenFocus] = useState(false);
  const [usernameLenMsg, setUsernameLenMsg] = useState<null | string>(null);
  const [usernameValidFocus, setUsernameValidFocus] = useState(false);
  const [usernameValidMsg, setUsernameValidMsg] = useState<null | string>(null);

  // const [password, setPassword] = useState("");
  const [pwLenFocus, setPwLenFocus] = useState(false);
  const [pwLenMsg, setPwLenMsg] = useState<null | string>(null);
  const [pwSpecialFocus, setPwSpecialFocus] = useState(false);
  const [pwSpecialMsg, setPwSpecialMsg] = useState<null | string>(null);
  const [pwCapitalFocus, setPwCapitalFocus] = useState(false);
  const [pwCapitalMsg, setPwCapitalMsg] = useState<null | string>(null);
  const [pwNumFocus, setPwNumFocus] = useState(false);
  const [pwNumMsg, setPwNumMsg] = useState<null | string>(null);

  // const [confPassword, setConfPassword] = useState("");
  const [confirmPwFocus, setConfirmPwFocus] = useState(false);
  const [confirmPwMsg, setConfirmPwMsg] = useState<null | string>(null);

  // const [age, setAge] = useState("");
  const [ageFocus, setAgeFocus] = useState(false);
  const [ageMsg, setAgeMsg] = useState<null | string>(null);

  // HANDLERS
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // setEmail(value);
    setRegdata({
      ...regData,
      email: value,
    });

    if (!emailRegex.test(value)) {
      setEmailValidMsg("Use a valid email, thanks.");
    } else {
      setEmailValidMsg(null);
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const nameRegex = /^[a-zA-Z0-9!._\-@#*$]+$/;
    // setUsername(value);
    setRegdata({
      ...regData,
      username: value,
    });

    if (value.length < 3 || value.length > 30) {
      setUsernameLenMsg("3-30 characters");
    } else {
      setUsernameLenMsg(null);
    }

    if (!nameRegex.test(value)) {
      setUsernameValidMsg("Only alphanumeric and !._-@#*$");
    } else {
      setUsernameValidMsg(null);
    }
    console.log("username", value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // setPassword(value);
    setRegdata({
      ...regData,
      password: value,
    });

    if (value.length < 8 || value.length > 30) {
      setPwLenMsg("8-30 characters.");
    } else {
      setPwLenMsg(null);
    }

    if (!/\d/.test(value)) {
      setPwNumMsg("At least one number.");
    } else {
      setPwNumMsg(null);
    }

    if (!/[A-Z]/.test(value)) {
      setPwCapitalMsg("At least one Uppercase letter.");
    } else {
      setPwCapitalMsg(null);
    }

    if (!/[!._\-@#*$]/.test(value)) {
      setPwSpecialMsg("At least one special character (!._-@#*$)");
    } else {
      setPwSpecialMsg(null);
    }
  };

  const handleConfPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // setConfPassword(value);
    setRegdata({
      ...regData,
      confirmPassword: value,
    });

    if (value !== regData.password) {
      setConfirmPwMsg("Passwords doesn't match.");
    } else {
      setConfirmPwMsg(null);
    }
  };

  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[0-9]*$/;
    // setAge(value);
    setRegdata({
      ...regData,
      age: value,
    });

    if (value.length > 0 && !regex.test(value)) {
      setAgeMsg("That is not a number.");
    } else if (value.length > 2) {
      setAgeMsg("Sorry too old.");
    } else {
      setAgeMsg(null);
    }
  };

  const handleGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRegdata({
      ...regData,
      gender: value as Gender,
    });
  };

  const registerUser = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      regData.gender !== Gender.Male &&
      regData.gender !== Gender.Female &&
      regData.gender !== Gender.Other
    ) {
      console.log("Stop that shit!");
    } else {
      try {
        console.log("NEW USER", regData);
      } catch (error) {
        console.log("something weird in the neighbourhood", error);
      }
    }
  };

  console.log("regData", regData);

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
          Or register with
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
        <form onSubmit={registerUser}>
          <div className="reg-fields">
            {/* EMAIL */}
            <label htmlFor="email" style={{ marginTop: "0" }}>
              Email
            </label>
            <InputField
              className="reg-input"
              type="email"
              value={regData.email}
              // value={email}
              autoComplete="off"
              required={true}
              name="email"
              id="email"
              placeholder="your@email.com..."
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
                <div>- {emailValidMsg}</div>
              </div>
            )}

            {/* USERNANME */}
            <label htmlFor="username">Username</label>
            <InputField
              className="reg-input"
              type="text"
              value={regData.username}
              // value={username}
              autoComplete="off"
              required={true}
              name="username"
              id="username"
              placeholder="username..."
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
                <div>- {usernameLenMsg}</div>
              </div>
            )}
            {usernameValidFocus && usernameValidMsg && (
              <div className="regmsg">
                <div>- {usernameValidMsg}</div>
              </div>
            )}

            {/* PASSWORD */}
            <label htmlFor="password">Password</label>
            <InputField
              className="reg-input"
              type="password"
              placeholder="password..."
              autoComplete="off"
              required={true}
              value={regData.password}
              // value={password}
              name="password"
              id="password"
              onChange={handlePasswordChange}
              onFocus={() => {
                setPwLenFocus(true);
                setPwNumFocus(true);
                setPwCapitalFocus(true);
                setPwSpecialFocus(true);
              }}
              onBlur={() => {
                setPwLenFocus(false);
                setPwNumFocus(false);
                setPwCapitalFocus(false);
                setPwSpecialFocus(false);
              }}
            />
            {pwLenFocus && pwLenMsg && (
              <div className="regmsg">
                <div>- {pwLenMsg}</div>
              </div>
            )}
            {pwNumFocus && pwNumMsg && (
              <div className="regmsg">
                <div>- {pwNumMsg}</div>
              </div>
            )}
            {pwCapitalFocus && pwCapitalMsg && (
              <div className="regmsg">
                <div>- {pwCapitalMsg}</div>
              </div>
            )}
            {pwSpecialFocus && pwSpecialMsg && (
              <div className="regmsg">
                <div>- {pwSpecialMsg}</div>
              </div>
            )}

            {/* CONFIRM PASSWORD */}
            <label htmlFor="confPassword">Confirm Password</label>
            <InputField
              className="reg-input"
              type="password"
              placeholder="password again..."
              autoComplete="off"
              required={true}
              value={regData.confirmPassword}
              // value={confPassword}
              name="confPassword"
              id="confPassword"
              onChange={handleConfPasswordChange}
              onFocus={() => {
                setConfirmPwFocus(true);
              }}
              onBlur={() => {
                setConfirmPwFocus(false);
              }}
            />
            {confirmPwFocus && confirmPwMsg && (
              <div className="regmsg">
                <div>- {confirmPwMsg}</div>
              </div>
            )}

            {/* AGE */}
            <label htmlFor="age">Age</label>
            <InputField
              className="reg-input"
              type="text"
              placeholder="age..."
              autoComplete="off"
              required={true}
              value={regData.age}
              // value={age}
              name="age"
              id="age"
              onChange={handleAge}
              onFocus={() => setAgeFocus(true)}
              onBlur={() => setAgeFocus(false)}
            />
            {ageFocus && ageMsg && (
              <div className="regmsg">
                <div>- {ageMsg}</div>
              </div>
            )}
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              required
              style={{ padding: "1.3vh 1vh" }}
              onChange={handleGender}
              value={regData.gender}
            >
              <option value={Gender.Choose} hidden>
                Choose one...
              </option>
              <option value={Gender.Male}>Male</option>
              <option value={Gender.Female}>Female</option>
              <option value={Gender.Other}>Other</option>
            </select>
            <MyButton
              className="myButton filledButton extra-button"
              type="submit"
              style={{
                margin: "0",
                marginTop: "3vh",
                padding: "2vh",
                backgroundColor: "var(--prima)",
                color: "white",
              }}
            >
              Register
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
