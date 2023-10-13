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

  const toNextStep = () => {
    // event.preventDefault();
    setStep(step + 1);
  };

  const toPrevStep = () => {
    // event.preventDefault();
    setStep(step - 1);
  };

  const finishRegister = (event: FormEvent) => {
    event.preventDefault();
    console.log("Okay this is me", email, passwd, username, age, gender);
  };

  return (
    <div className="register-page">
      <h1 style={{ fontFamily: "MilgranRegular" }}>Registration</h1>

      {step === 2 ? (
        <h2>Everything correct?</h2>
      ) : (
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
        </div>
      )}

      {/* FORM STUFF BEGINS */}

      {/* Step 0 */}

      {step === 0 && (
        // <form
        //   style={{ width: "100%" }}
        //   onSubmit={(event) => {
        //     event.preventDefault();
        //     console.log("SOME FORM ACTION from step 0!");
        //   }}
        //   // onSubmit={finishRegister}
        // >
        <div className="reg-fields">
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <MyInput
              className="my-input"
              type="text"
              name="email"
              id="email"
              onChange={handleEmail}
            />
          </div>
          <div className="label-input">
            <label htmlFor="passwd">Password</label>
            <MyInput
              className="my-input"
              type="text"
              name="passwd"
              id="passwd"
              onChange={handleEmail}
            />
          </div>
          <div className="label-input">
            <label htmlFor="passwd2">Confirm Password</label>
            <MyInput
              className="my-input"
              type="text"
              name="passwd2"
              id="passwd2"
            />
          </div>

          <div className="label-input">
            <MyButton
              className="my-button filled-button"
              type="button"
              style={{
                width: "436px",
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

      {/* Step 1 */}

      {step === 1 && (
        // <form
        //   style={{ width: "100%" }}
        //   onSubmit={(event) => {
        //     event.preventDefault();
        //     console.log("SOME FORM ACTION from step 1!");
        //   }}
        // >
        <div className="reg-fields">
          <div className="label-input">
            <label htmlFor="username">Username</label>
            <MyInput className="my-input" type="text" name="username" />
          </div>
          <div className="label-input">
            <label htmlFor="age">Age</label>
            <MyInput className="my-input" type="text" name="age" />
          </div>
          <div className="label-input">
            <label htmlFor="gender">Gender</label>
            <MyInput className="my-input" type="text" name="gender" />
          </div>

          <div
            className="label-input"
            style={{ width: "440px", flexDirection: "row" }}
          >
            <MyButton
              className="my-button outlined-button"
              type="button"
              style={{
                width: "30%",
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
                width: "70%",
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

      {step === 2 && (
        <form style={{ width: "100%" }} onSubmit={finishRegister}>
          <div className="reg-fields">
            {/* <h2>Everything correct?</h2> */}
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
              <MyInput className="my-input" type="text" name="username" />
            </div>
            <div className="label-input">
              <label htmlFor="age">Age</label>
              <MyInput className="my-input" type="text" name="age" />
            </div>
            <div className="label-input">
              <label htmlFor="gender">Gender</label>
              <MyInput className="my-input" type="text" name="gender" />
            </div>
            <div
              className="label-input"
              style={{ width: "440px", flexDirection: "row" }}
            >
              <MyButton
                className="my-button outlined-button"
                type="button"
                style={{
                  width: "30%",
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
                  width: "70%",
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
