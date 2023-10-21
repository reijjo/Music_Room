import { Gender, InfoMsg } from "./types";

const emailCheck = (email: string): InfoMsg | undefined => {
  const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (email.length > 60) {
    return {
      message: "Email: Max 60 characters.",
      style: "info-error",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      message: "Email: That is not an email.",
      style: "info-error",
    };
  }
  return undefined;
};

const passwdCheck = (passwd: string): InfoMsg | undefined => {
  if (passwd.length < 8 || passwd.length > 30) {
    return {
      message: "Password: 8-30 characters in password.",
      style: "info-error",
    };
  }

  if (!/\d/.test(passwd)) {
    return {
      message: "Password: At least one number.",
      style: "info-error",
    };
  }

  if (!/[A-Z]/.test(passwd)) {
    return {
      message: "Password: At least one Uppercase letter.",
      style: "info-error",
    };
  }

  if (!/[!._\-@#*$]/.test(passwd)) {
    return {
      message: "Password: At least one special character !._-@#*$",
      style: "info-error",
    };
  }
  return undefined;
};

const usernameCheck = (username: string): InfoMsg | undefined => {
  const nameRegex = /^[a-zA-Z0-9._-]+$/;
  if (username.length < 3 || username.length > 30) {
    return {
      message: "Username: 3-30 characters.",
      style: "info-error",
    };
  }

  if (!nameRegex.test(username)) {
    return {
      message: "Username: Only letters, numbers and ._- allowed.",
      style: "info-error",
    };
  }

  return undefined;
};

const ageCheck = (age: string): InfoMsg | undefined => {
  const ageRegex = /^\d+$/;
  if (!ageRegex.test(age)) {
    return {
      message: "Age: Only numbers thanks.",
      style: "info-error",
    };
  }

  if (parseInt(age) < 6) {
    return {
      message: "Age: Grow up a bit.",
      style: "info-error",
    };
  }

  if (parseInt(age) > 99) {
    return {
      message: "Age: You are just too old.",
      style: "info-error",
    };
  }

  return undefined;
};

const genderCheck = (gender: Gender): InfoMsg | undefined => {
  if (
    gender !== Gender.Male &&
    gender !== Gender.Female &&
    gender !== Gender.Other
  ) {
    return {
      message: "Gender: Choose a gender.",
      style: "info-error",
    };
  }

  return undefined;
};

const checkValid = {
  emailCheck,
  passwdCheck,
  usernameCheck,
  ageCheck,
  genderCheck,
};

export default checkValid;
