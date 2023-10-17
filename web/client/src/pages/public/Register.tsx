import { FormEvent, useState } from "react";

import {
  FormErrors,
  FormFocus,
  Gender,
  UserData,
  InfoMsg,
} from "../../utils/types";
import userService from "../../api/users";

import Step0 from "./register/Step0";
import Step1 from "./register/Step1";
import Step2 from "./register/Step2";
import Step3 from "./register/Step3";

// import MyButton from "../../components/MyButton";
// import MyInput from "../../components/MyInput";

const Register = () => {
  const [step, setStep] = useState<number>(0);
  const [lastStep, setLastStep] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    passwd: "",
    passwd2: "",
    username: "",
    age: "",
    gender: Gender.Select,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: {
      lenMsg: null,
      validMsg: null,
    },
    passwd: {
      lenMsg: null,
      specialMsg: null,
      capitalMsg: null,
      numMsg: null,
    },
    passwd2: {
      pw2Msg: null,
    },
    username: {
      lenMsg: null,
      validMsg: null,
    },
    age: {
      validMsg: null,
      youngMsg: null,
      oldMsg: null,
    },
  });
  const [formFocus, setFormFocus] = useState<FormFocus>({
    email: false,
    passwd: false,
    passwd2: false,
    username: false,
    age: false,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // CHECKS EMAIL

    if (name === "email") {
      const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const emailLenMsg =
        value.length > 60 ? "Max 60 characters on email." : null;
      const emailValidMsg = !emailRegex.test(value)
        ? "That is not a legit email."
        : null;

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: { lenMsg: emailLenMsg, validMsg: emailValidMsg },
      }));

      // CHECKS PASSWD
    } else if (name === "passwd") {
      const pwLenMsg =
        value.length < 8 || value.length > 30 ? "8-30 characters." : null;
      const pwNumMsg = !/\d/.test(value) ? "At least one number." : null;
      const pwCapitalMsg = !/[A-Z]/.test(value)
        ? "At least one Uppercase letter."
        : null;
      const pwSpecialMsg = !/[!._\-@#*$]/.test(value)
        ? "At least one special character !._-@#*$"
        : null;

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwd: {
          lenMsg: pwLenMsg,
          numMsg: pwNumMsg,
          capitalMsg: pwCapitalMsg,
          specialMsg: pwSpecialMsg,
        },
      }));

      // CHECKS PASSWD2
    } else if (name === "passwd2") {
      const pw2Msg =
        value !== userData.passwd ? "Passwords doesn't match." : null;

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwd2: {
          pw2Msg: pw2Msg,
        },
      }));

      // CHECKS USERNAME
    } else if (name === "username") {
      const nameRegex = /^[a-zA-Z0-9._-]+$/;
      const usernameLenMsg =
        value.length < 3 || value.length > 30 ? "3-30 characters." : null;
      const usernameValidMsg = !nameRegex.test(value)
        ? "Only letters, numbers and ._- allowed."
        : null;

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: {
          lenMsg: usernameLenMsg,
          validMsg: usernameValidMsg,
        },
      }));

      // CHECKS AGE
    } else if (name === "age") {
      const ageRegex = /^\d+$/;
      const ageValidMsg = !ageRegex.test(value) ? "Only numbers thanks." : null;
      const ageYoungMsg = parseInt(value) < 6 ? "Grow up a bit." : null;
      const ageOldMsg = parseInt(value) > 99 ? "You are just too old." : null;

      setFormErrors((prevError) => ({
        ...prevError,
        age: {
          validMsg: ageValidMsg,
          youngMsg: ageYoungMsg,
          oldMsg: ageOldMsg,
        },
      }));
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value as Gender,
    }));

    if (value === "select") {
      console.log("CHOOSE A GENDER");
    }
  };

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (name === "email") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        email: true,
      }));
    } else if (name === "passwd") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        passwd: true,
      }));
    } else if (name === "passwd2") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        passwd2: true,
      }));
    } else if (name === "username") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        username: true,
      }));
    } else if (name === "age") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        age: true,
      }));
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (name === "email") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        email: false,
      }));
    } else if (name === "passwd") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        passwd: false,
      }));
    } else if (name === "passwd2") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        passwd2: false,
      }));
    } else if (name === "username") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        username: false,
      }));
    } else if (name === "age") {
      setFormFocus((prevFocus) => ({
        ...prevFocus,
        age: false,
      }));
    }
  };
  const [infoMsg, setInfoMsg] = useState<InfoMsg>({
    style: "",
    message: "",
  });

  const toNextStep = () => {
    // Check for empty fields on Step1

    if (
      step === 1 &&
      (userData.email.trim() === "" ||
        userData.passwd.trim() === "" ||
        userData.passwd2.trim() === "")
    ) {
      // Set error message if there is an empty field

      setInfoMsg({
        message: "Fill all the fields, thanks.",
        style: "info-error",
      });
      setTimeout(() => {
        setInfoMsg({ message: null });
      }, 5000);
    } else if (
      step === 2 &&
      (userData.username.trim() === "" ||
        userData.age.trim() === "" ||
        (userData.gender !== "Male" &&
          userData.gender !== "Female" &&
          userData.gender !== "Other"))
    ) {
      setInfoMsg({ message: "No empty fields!", style: "info-error" });
      setTimeout(() => {
        setInfoMsg({ message: null });
      }, 5000);
    } else {
      setInfoMsg({ message: null });
      setLastStep(true);
      setStep(step + 1);
    }
  };

  const toPrevStep = () => {
    setLastStep(false);
    setStep(step - 1);
    setInfoMsg({ message: null });
  };

  const finishRegister = (event: FormEvent) => {
    event.preventDefault();

    const user = {
      ...userData,
    };

    const res = userService.newUser(user);
    console.log("New user response", res);

    console.log(
      "Okay this is me",
      userData.email,
      userData.passwd,
      userData.passwd2,
      userData.username,
      userData.age,
      userData.gender
    );
  };

  // console.log("GENDER", userData.gender);
  // console.log("LAST STEP", lastStep);
  // console.log("step", step);

  return (
    <div className="register-page">
      <h1 style={{ fontFamily: "MilgranRegular" }}>Registration</h1>
      {step === 0 && <Step0 toNextStep={toNextStep} />}
      {step === 1 && (
        <Step1
          userData={userData}
          handleInput={handleInput}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          formFocus={formFocus}
          formErrors={formErrors}
          toPrevStep={toPrevStep}
          toNextStep={toNextStep}
          infoMsg={infoMsg}
        />
      )}
      {step === 2 && (
        <Step2
          userData={userData}
          handleInput={handleInput}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          formFocus={formFocus}
          formErrors={formErrors}
          toPrevStep={toPrevStep}
          toNextStep={toNextStep}
          handleSelect={handleSelect}
          infoMsg={infoMsg}
        />
      )}
      {step === 3 && (
        <Step3
          userData={userData}
          formErrors={formErrors}
          toPrevStep={toPrevStep}
          lastStep={lastStep}
          finishRegister={finishRegister}
        />
      )}
    </div>
  );
};

export default Register;
