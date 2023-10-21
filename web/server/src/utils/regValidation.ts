import { Gender, InfoMsg } from "./types";

const emailCheck = (email: string): InfoMsg | undefined => {
  const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (email.length > 60) {
    return {
      message: "Max 60 characters on email.",
      style: "info-error",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      message: "That is not an email.",
      style: "info-error",
    };
  }
  return undefined;
};

const passwdCheck = (passwd: string): InfoMsg | undefined => {
  if (passwd.length < 8 || passwd.length > 30) {
    return {
      message: "8-30 characters in password, please.",
      style: "info-error",
    };
  }
};

const usernameCheck = () => {};

const ageCheck = () => {};

const genderCheck = () => {};

const checkValid = {
  emailCheck,
  passwdCheck,
  usernameCheck,
  ageCheck,
  genderCheck,
};

export default checkValid;
