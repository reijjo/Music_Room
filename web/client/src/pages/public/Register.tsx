import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import fb from "../../assets/images/ico-fb.png";
import google from "../../assets/images/ico-google.png";

const Register = () => {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwd2, setPasswd2] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswd(value);
  };

  const handlePasswd2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswd2(value);
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAge(value);
  };

  const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      {/* Step 0 */}

      {step === 1 && (
        <form style={{ width: "100%" }}>
          <div className="reg-fields">
            {/* EMAIL */}

            <div className="label-input">
              <label htmlFor="email">Email</label>
              <MyInput
                className="my-input"
                type="email"
                name="email"
                id="email"
                value={email}
                required
                onChange={handleEmail}
              />
            </div>

            {/* PASSWORD */}

            <div className="label-input">
              <label htmlFor="passwd">Password</label>
              <MyInput
                className="my-input"
                type="password"
                name="passwd"
                id="passwd"
                onChange={handlePasswd}
                autoComplete="off"
                value={passwd}
              />
            </div>

            {/* PASSWORD 2 */}

            <div className="label-input">
              <label htmlFor="passwd2">Confirm Password</label>
              <MyInput
                className="my-input"
                type="text"
                name="passwd2"
                id="passwd2"
                onChange={handlePasswd2}
                autoComplete="off"
                value={passwd2}
              />
            </div>

            <div
              className="label-input"
              style={{ width: "440px", flexDirection: "row" }}
            >
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
        </form>
      )}

      {/* Step 1 */}

      {step === 2 && (
        <div className="reg-fields">
          {/* USERNAME */}

          <div className="label-input">
            <label htmlFor="username">Username</label>
            <MyInput
              className="my-input"
              type="text"
              name="username"
              onChange={handleUsername}
              value={username}
            />
          </div>

          {/* AGE */}

          <div className="label-input">
            <label htmlFor="age">Age</label>
            <MyInput
              className="my-input"
              type="text"
              name="age"
              onChange={handleAge}
              value={age}
            />
          </div>

          {/* GENDER */}

          <div className="label-input">
            <label htmlFor="gender">Gender</label>
            <MyInput
              className="my-input"
              type="text"
              name="gender"
              onChange={handleGender}
              value={gender}
            />
          </div>

          <div
            className="label-input"
            style={{ width: "440px", flexDirection: "row" }}
          >
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
        // </form>
      )}

      {/* Step 2 */}

      {step === 3 && (
        <form style={{ width: "100%" }} onSubmit={finishRegister}>
          <div className="reg-fields">
            <h2>Everything correct?</h2>
            <div className="label-input">
              <label htmlFor="email">Email</label>
              <MyInput
                className="my-input"
                type="text"
                name="email"
                value={email}
                readOnly
              />
            </div>
            {/* <div className="label-input">
              <label htmlFor="passwd">Password</label>
              <MyInput className="my-input" type="text" name="passwd" />
            </div> */}
            <div className="label-input">
              <label htmlFor="username">Username</label>
              <MyInput
                className="my-input"
                type="text"
                name="username"
                value={username}
                readOnly
              />
            </div>
            <div className="label-input">
              <label htmlFor="age">Age</label>
              <MyInput
                className="my-input"
                type="text"
                name="age"
                value={age}
                readOnly
              />
            </div>
            <div className="label-input">
              <label htmlFor="gender">Gender</label>
              <MyInput
                className="my-input"
                type="text"
                name="gender"
                value={gender}
                readOnly
              />
            </div>
            <div
              className="label-input"
              style={{ width: "440px", flexDirection: "row" }}
            >
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
        </form>
      )}
    </div>
  );
};

export default Register;
