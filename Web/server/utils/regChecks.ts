// Here we have all the checks that the registration info is valid

import { Gender, MessageInfo } from "./types";

const emailCheck = (email: string): MessageInfo | undefined => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.match(emailRegex)) {
    return {
      className: "infoError",
      message: "That is not a valid email!",
    } as MessageInfo;
  }

  if (email.length > 60) {
    return {
      className: "infoError",
      message: "Max 60 characters on email.",
    } as MessageInfo;
  }
  return undefined;
};

const usernameCheck = (username: string): MessageInfo | undefined => {
  const nameRegex = /^[a-zA-Z0-9!._\-@#*$]+$/;

  if (!username.match(nameRegex)) {
    return {
      className: "infoError",
      message: "Only alphanumeric and !._-@#*$ on username!",
    };
  }

  if (username.length < 3 || username.length > 30) {
    return {
      className: "infoError",
      message: "Username must be 3 - 30 characters.",
    };
  }
  return undefined;
};

const pwCheck = (passwd: string): MessageInfo | undefined => {
  if (passwd.length < 8 || passwd.length > 30) {
    return {
      className: "infoError",
      message: "Password must be 8 - 30 characters.",
    };
  }

  if (!/\d/.test(passwd)) {
    return {
      className: "infoError",
      message: "At least one number in password!",
    };
  }

  if (!/[A-Z]/.test(passwd)) {
    return {
      className: "infoError",
      message: "One uppercase letter in password, thanks",
    };
  }

  if (!/[!._\-@#*$]/.test(passwd)) {
    return {
      className: "infoError",
      message: "Passwords needs one special character (!._-@#*$)",
    };
  }

  return undefined;
};

const ageCheck = (age: string): MessageInfo | undefined => {
  const regex = /^[0-9]*$/;

  if (age.length > 0 && !regex.test(age)) {
    return {
      className: "infoError",
      message: "Just numbers on age.",
    };
  }

  if (age.length < 1) {
    return {
      className: "infoError",
      message: "You can't be nothing years old.",
    };
  }

  if (age.length > 2) {
    return {
      className: "infoError",
      message: "You are just too old.",
    };
  }

  return undefined;
};

const genderCheck = (gender: Gender): MessageInfo | undefined => {
  if (
    gender !== Gender.Male &&
    gender !== Gender.Female &&
    gender !== Gender.Other
  ) {
    return {
      className: "infoError",
      message: "You must choose a gender",
    };
  }

  return undefined;
};

const checks = {
  emailCheck,
  usernameCheck,
  pwCheck,
  ageCheck,
  genderCheck,
};

export default checks;
