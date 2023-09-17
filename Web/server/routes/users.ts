import express, { Request, Response } from "express";
import { RegisterData } from "../utils/types";
import checks from "../utils/regChecks";
// import { pool } from "../utils/dbConnection";
// import { config } from "../utils/config";

const usersRouter = express.Router();

// Route to register the user

usersRouter.post("/", async (req: Request, res: Response) => {
  const user = req.body as RegisterData;

  const emailNotif = checks.emailCheck(user.email);
  const usernameNotif = checks.usernameCheck(user.username);
  const pwNotif = checks.pwCheck(user.password);
  const ageNotif = checks.ageCheck(user.age);
  const genderNotif = checks.genderCheck(user.gender);

  // Run all the checks first

  if (emailNotif) {
    return res.send({ messageBanner: emailNotif });
  } else if (usernameNotif) {
    return res.send({ messageBanner: usernameNotif });
  } else if (pwNotif) {
    return res.send({ messageBanner: pwNotif });
  } else if (user.password !== user.confirmPassword) {
    return res.send({
      messageBanner: {
        className: "infoError",
        message: "Passwords do not match.",
      },
    });
  } else if (ageNotif) {
    return res.send({ messageBanner: ageNotif });
  } else if (genderNotif) {
    return res.send({ messageBanner: genderNotif });
  } else {
    // If everything okay, we start encrypting the password and sending registration email

    return res.send({
      messageBanner: { className: "infoOK", message: "Woppwoop" },
    });
  }
});

export { usersRouter };
