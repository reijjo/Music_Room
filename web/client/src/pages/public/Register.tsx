import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import fb from "../../assets/images/ico-fb.png";
import google from "../../assets/images/ico-google.png";

const Register = () => {
  const [step, setStep] = useState<number>(0);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailLenMsg, setEmailLenMsg] = useState<null | string>(null);
  const [emailValidMsg, setEmailValidMsg] = useState<null | string>(null);

  const [passwd, setPasswd] = useState("");
  const [pwFocus, setPwFocus] = useState(false);
  const [pwLenMsg, setPwLenMsg] = useState<null | string>(null);
  const [pwSpecialMsg, setPwSpecialMsg] = useState<null | string>(null);
  const [pwCapitalMsg, setPwCapitalMsg] = useState<null | string>(null);
  const [pwNumMsg, setPwNumMsg] = useState<null | string>(null);

  const [passwd2, setPasswd2] = useState("");
  const [pw2Focus, setPw2Focus] = useState(false);
  const [pw2Msg, setPw2Msg] = useState<null | string>(null);

  const [username, setUsername] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [usernameLenMsg, setUsernameLenMsg] = useState<null | string>(null);
  const [usernameValidMsg, setUsernameValidMsg] = useState<null | string>(null);

  const [age, setAge] = useState("");
  const [ageFocus, setAgeFocus] = useState(false);
  const [ageValidMsg, setAgeValidMsg] = useState<null | string>(null);
  const [ageYoungMsg, setAgeYoungMsg] = useState<null | string>(null);
  const [ageOldMsg, setAgeOldMsg] = useState<null | string>(null);

  const [gender, setGender] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmail(value);

    {
      !emailRegex.test(value)
        ? setEmailValidMsg("That is not a legit email.")
        : setEmailValidMsg(null);
    }
    {
      value.length > 60
        ? setEmailLenMsg("Max 60 characters on email.")
        : setEmailLenMsg(null);
    }
  };

  const handlePasswd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswd(value);

    {
      value.length < 8 || value.length > 30
        ? setPwLenMsg("8-30 characters.")
        : setPwLenMsg(null);
    }
    {
      !/\d/.test(value)
        ? setPwNumMsg("At least one number.")
        : setPwNumMsg(null);
    }
    {
      !/[A-Z]/.test(value)
        ? setPwCapitalMsg("At least one Uppercase letter.")
        : setPwCapitalMsg(null);
    }
    {
      !/[!._\-@#*$]/.test(value)
        ? setPwSpecialMsg("At least one special character !._-@#*$")
        : setPwSpecialMsg(null);
    }
  };

  const handlePasswd2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswd2(value);

    {
      value !== passwd
        ? setPw2Msg("Passwords doesn't match.")
        : setPw2Msg(null);
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const nameRegex = /^[a-zA-Z0-9._-]+$/;
    setUsername(value);

    {
      value.length < 3 || value.length > 30
        ? setUsernameLenMsg("3-30 characters.")
        : setUsernameLenMsg(null);
    }
    {
      !nameRegex.test(value)
        ? setUsernameValidMsg("Only letters, numbers and ._- allowed.")
        : setUsernameValidMsg(null);
    }
  };

  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const ageRegex = /^\d+$/;
    setAge(value);

    {
      !ageRegex.test(value)
        ? setAgeValidMsg("Only numbers thanks.")
        : setAgeValidMsg(null);
    }
    {
      parseInt(value) < 6
        ? setAgeYoungMsg("Grow up a bit.")
        : setAgeYoungMsg(null);
    }
    {
      parseInt(value) > 99
        ? setAgeOldMsg("You are just too old.")
        : setAgeOldMsg(null);
    }
  };

  const handleGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setGender(value);
  };

  const toNextStep = () => {
    if (
      step === 1 &&
      (email.trim() === "" || passwd.trim() === "" || passwd2.trim() === "")
    ) {
      console.log("No empty fields u fucker.");
    } else if (
      step === 2 &&
      (username.trim() === "" || age.trim() === "" || gender.trim() === "")
    ) {
      console.log("No empty fields u fucker2.");
    } else {
      setStep(step + 1);
    }
  };

  const toPrevStep = () => {
    // event.preventDefault();
    setStep(step - 1);
  };

  const finishRegister = (event: FormEvent) => {
    event.preventDefault();
    console.log(
      "Okay this is me",
      email,
      passwd,
      passwd2,
      username,
      age,
      gender
    );
  };

  console.log("GENDER", gender);

  return (
    <div className="register-page">
      <h1 style={{ fontFamily: "MilgranRegular" }}>Registration</h1>

      {step === 0 && (
        <div className="got-account">
          <div style={{ color: "var(--primarylight)" }}>
            Already got an account?{" "}
            <Link to="/login">
              <MyButton
                className="my-button text-button"
                style={{ margin: "0" }}
              >
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
      )}

      {/* FORM STUFF BEGINS */}

      {/* Step 1 */}

      {step === 1 && (
        <form style={{ width: "100%" }}>
          <div className="reg-fields">
            {/* EMAIL */}

            <div className="input-block">
              <div className="label-input">
                <label htmlFor="email">Email</label>
                <MyInput
                  className="my-input"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  autoComplete="off"
                  required
                  onChange={handleEmail}
                  onFocus={() => {
                    setEmailFocus(true);
                  }}
                  onBlur={() => {
                    setEmailFocus(false);
                  }}
                />
                {emailFocus && (emailLenMsg || emailValidMsg) && (
                  <ul>
                    {emailLenMsg && <li>{emailLenMsg}</li>}
                    {emailValidMsg && <li>{emailValidMsg}</li>}
                  </ul>
                )}
              </div>
            </div>

            {/* PASSWORD */}

            <div className="input-block">
              <div className="label-input">
                <label htmlFor="passwd">Password</label>
                <MyInput
                  className="my-input"
                  type="password"
                  name="passwd"
                  id="passwd"
                  autoComplete="off"
                  value={passwd}
                  onChange={handlePasswd}
                  onFocus={() => {
                    setPwFocus(true);
                  }}
                  onBlur={() => {
                    setPwFocus(false);
                  }}
                />
                {pwFocus &&
                  (pwLenMsg || pwSpecialMsg || pwCapitalMsg || pwNumMsg) && (
                    <ul>
                      {pwLenMsg && <li>{pwLenMsg}</li>}
                      {pwSpecialMsg && <li>{pwSpecialMsg}</li>}
                      {pwCapitalMsg && <li>{pwCapitalMsg}</li>}
                      {pwNumMsg && <li>{pwNumMsg}</li>}
                    </ul>
                  )}
              </div>
            </div>

            {/* PASSWORD 2 */}

            <div className="input-block">
              <div className="label-input">
                <label htmlFor="passwd2">Confirm Password</label>
                <MyInput
                  className="my-input"
                  type="text"
                  name="passwd2"
                  id="passwd2"
                  onChange={handlePasswd2}
                  onFocus={() => {
                    setPw2Focus(true);
                  }}
                  onBlur={() => {
                    setPw2Focus(false);
                  }}
                  autoComplete="off"
                  value={passwd2}
                />
                {pw2Focus && pw2Msg && <ul>{pw2Msg && <li>{pw2Msg}</li>}</ul>}
              </div>
            </div>

            {/* BUTTONS */}

            <div className="input-block">
              <div className="label-input" style={{ flexDirection: "row" }}>
                <MyButton
                  className="my-button outlined-button"
                  type="button"
                  style={{
                    width: "50%",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                  }}
                  onClick={toPrevStep}
                >
                  Back
                </MyButton>
                <MyButton
                  className="my-button filled-button"
                  type="button"
                  style={{
                    width: "50%",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                  }}
                  onClick={toNextStep}
                >
                  Next
                </MyButton>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Step 2 */}

      {step === 2 && (
        <form style={{ width: "100%" }}>
          <div className="reg-fields">
            {/* USERNAME */}

            <div className="input-block">
              <div className="label-input">
                <label htmlFor="username">Username</label>
                <MyInput
                  className="my-input"
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={username}
                  onChange={handleUsername}
                  onFocus={() => {
                    setUsernameFocus(true);
                  }}
                  onBlur={() => {
                    setUsernameFocus(false);
                  }}
                />
                {usernameFocus && (usernameLenMsg || usernameValidMsg) && (
                  <ul>
                    {usernameLenMsg && <li>{usernameLenMsg}</li>}
                    {usernameValidMsg && <li>{usernameValidMsg}</li>}
                  </ul>
                )}
              </div>
            </div>

            {/* AGE */}

            <div className="input-block">
              <div className="label-input">
                <label htmlFor="age">Age</label>
                <MyInput
                  className="my-input"
                  type="text"
                  name="age"
                  id="age"
                  autoComplete="off"
                  value={age}
                  onChange={handleAge}
                  onFocus={() => {
                    setAgeFocus(true);
                  }}
                  onBlur={() => {
                    setAgeFocus(false);
                  }}
                />
                {ageFocus && (ageValidMsg || ageYoungMsg || ageOldMsg) && (
                  <ul>
                    {ageValidMsg && <li>{ageValidMsg}</li>}
                    {ageYoungMsg && <li>{ageYoungMsg}</li>}
                    {ageOldMsg && <li>{ageOldMsg}</li>}
                  </ul>
                )}
              </div>
            </div>

            {/* GENDER */}

            <div className="input-block">
              <div className="label-input">
                <label htmlFor="gender">Gender</label>
                <select
                  value={gender}
                  onChange={handleGender}
                  className="my-input"
                  id="gender"
                >
                  <option value="select">Select gender:</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="input-block">
              <div className="label-input" style={{ flexDirection: "row" }}>
                <MyButton
                  className="my-button outlined-button"
                  type="button"
                  style={{
                    width: "50%",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                  }}
                  onClick={toPrevStep}
                >
                  Back
                </MyButton>
                <MyButton
                  className="my-button filled-button"
                  type="button"
                  style={{
                    width: "50%",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                  }}
                  onClick={toNextStep}
                >
                  Next
                </MyButton>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Step 2 */}

      {step === 3 && (
        <form style={{ width: "100%" }} onSubmit={finishRegister}>
          <div className="reg-fields">
            <h2>Everything correct?</h2>
            <div className="input-block">
              <div className="label-input">
                <label htmlFor="email">Email</label>
                <MyInput
                  className="my-input"
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  readOnly
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="input-block">
              <div className="label-input">
                <label htmlFor="username">Username</label>
                <MyInput
                  className="my-input"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  readOnly
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-block">
              <div className="label-input">
                <label htmlFor="age">Age</label>
                <MyInput
                  className="my-input"
                  type="text"
                  name="age"
                  id="age"
                  value={age}
                  readOnly
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-block">
              <div className="label-input">
                <label htmlFor="gender">Gender</label>
                <MyInput
                  className="my-input"
                  type="text"
                  name="gender"
                  id="gender"
                  value={gender}
                  readOnly
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-block">
              <div className="label-input" style={{ flexDirection: "row" }}>
                <MyButton
                  className="my-button outlined-button"
                  type="button"
                  style={{
                    width: "50%",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                  }}
                  onClick={toPrevStep}
                >
                  Back
                </MyButton>
                <MyButton
                  className="my-button filled-button"
                  style={{
                    width: "50%",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                  }}
                  type="submit"
                >
                  Finish
                </MyButton>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
