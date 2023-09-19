import express, { Request, Response } from "express";
import { RegisterData } from "../utils/types";
import checks from "../utils/regChecks";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { config } from "../utils/config";
import { pool } from "../utils/dbConnection";

const usersRouter = express.Router();

// Route to register the user

usersRouter.post("/", async (req: Request, res: Response) => {
  const user = req.body as RegisterData;

  const emailNotif = checks.emailCheck(user.email);
  const usernameNotif = checks.usernameCheck(user.username);
  const pwNotif = checks.pwCheck(user.password);
  const ageNotif = checks.ageCheck(user.age);
  const genderNotif = checks.genderCheck(user.gender);

  const sendVerifyCode = async (email: string, verifyCode: string) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASSWD,
        },
      });

      const options = {
        from: config.EMAIL_USER,
        to: email,
        subject: "TADAAA! Welcome to Music Room!",
        html: `
				<h3>click the link</h3><br />
				<a href="http://localhost:3000/${verifyCode}/verify"> HERE </a><br />
				<p>Thanks.</p>`,
      };

      await transporter.sendMail(options);
      // transporter.sendMail(options, (err, info) => {
      //   if (err) {
      //     console.log("MAIL ERROR", err);
      //   } else {
      //     console.log("Email sent", info);
      //     return undefined;
      //   }
      // });
    } catch (error) {
      console.error("Error sending email!", error);
    }
  };

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

    const passwdHash: string = await bcrypt.hash(user.password, 10);
    const verifyCode: string = passwdHash.replace("/", "3");

    // Add user to database

    try {
      const dupCheck = `SELECT * FROM users WHERE username = $1 OR email = $2`;
      const dupRes = await pool.query(dupCheck, [user.username, user.email]);

      if (dupRes.rowCount > 0) {
        return res.send({
          messageBanner: {
            message: "Username / Email already exists.",
            className: "infoError",
          },
        });
      } else {
        await sendVerifyCode(user.email, verifyCode);

        const addUserToDb = `
				INSERT INTO users (email, username, passwd, age, gender, verifycode)
				VALUES ($1, $2, $3, $4, $5, $6)
				`;
        // const addUserRes =
        await pool.query(addUserToDb, [
          user.email,
          user.username,
          passwdHash,
          user.age,
          user.gender,
          verifyCode,
        ]);
        // return res.send({
        //   ok: addUserRes.rows,
        //   messageBanner: {
        //     message: "Check your email!",
        //     className: "infoOK",
        //   },
        // });
      }
    } catch (error) {
      console.error("Error during duplicate check", error);
      return res.send({
        messageBanner: {
          message: `Error adding user.`,
          className: "infoOK",
        },
      });
    }

    return res.send({
      messageBanner: {
        message: `Check your email ${user.email}!`,
        className: "infoOK",
      },
    });
  }
});

export { usersRouter };
