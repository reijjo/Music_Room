import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import bcrypt from "bcryptjs";
import { pool } from "../utils/dbConnection";
import { User, UserFull } from "../utils/types";
import checkValid from "../utils/regValidation";
import { config } from "../utils/config";
import nodemailer from "nodemailer";

const usersRouter = express.Router();

// api/users

usersRouter.get("/", (async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<User[] | void> => {
  try {
    const sql = `SELECT * FROM users`;
    const result = await pool.query(sql);

    // console.log("resulstwors", result.rows);

    res.status(200).json(result.rows as User[]);
  } catch (error: unknown) {
    console.error("GET /api/users error", error);
    res.status(500).json({ error: "GET /api/users error" });
    next(error);
  }
}) as RequestHandler);

usersRouter.post("/", (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    console.log("ok im in post /");
    const user = req.body as UserFull;

    // Check that the user data is valid

    const chEmail = checkValid.emailCheck(user.email);
    const chPasswd = checkValid.passwdCheck(user.passwd);
    const chUsername = checkValid.usernameCheck(user.username);
    const chAge = checkValid.ageCheck(user.age);
    const chGender = checkValid.genderCheck(user.gender);

    if (chEmail) {
      return res.status(422).json(chEmail);
    }
    if (chPasswd) {
      return res.status(422).json(chPasswd);
    }
    if (user.passwd !== user.passwd2) {
      return res
        .status(422)
        .json({ message: "Passwords do not match!", style: "info-error" });
    } else if (chUsername) {
      return res.status(422).json(chUsername);
    }
    if (chAge) {
      return res.status(422).json(chAge);
    }
    if (chGender) {
      return res.status(422).json(chGender);

      // Hash the password and make a verifycode for forget password section
    } else {
      const passwdHash = await bcrypt.hash(user.passwd, 10);
      const verifycode = encodeURIComponent(
        await bcrypt.hash(`${user.passwd}${user.username}`, 10)
      ).replace("/", "");
      const userstatus = 1;

      // Check that username / email isnt taken

      try {
        const duplicateUserSql = `SELECT * FROM users WHERE username = $1`;
        const duplicateUserRes = await pool.query(duplicateUserSql, [
          user.username,
        ]);

        if (duplicateUserRes.rowCount > 0) {
          return res.status(400).json({
            message: "Username already exists",
            style: "info-error",
          });
        }

        const duplicateEmailSql = `SELECT * FROM users WHERE email = $1`;
        const duplicateEmailRes = await pool.query(duplicateEmailSql, [
          user.email,
        ]);

        if (duplicateEmailRes.rowCount > 0) {
          return res.status(400).json({
            message: "Email already exists",
            style: "info-error",
          });
        } else {
          // Add user to database

          const sql = `
      	INSERT INTO users (email, passwd, username, age, gender, verifycode, status)
      	VALUES ($1, $2, $3, $4, $5, $6, $7)`;

          await pool.query(sql, [
            user.email,
            passwdHash,
            user.username,
            user.age,
            user.gender,
            verifycode,
            userstatus,
          ]);
        }
      } catch (error: unknown) {
        console.log("error on duplicate check", error);
      }

      // Send account verify email

      console.log("CONFIG", config);

      const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: config.EMAIL_USERNAME,
          pass: config.EMAIL_PASSWORD,
        },
      });

      const options = {
        from: config.EMAIL_USERNAME,
        to: user.email,
        subject: "HEY! Verify your Music Room account!",
        html: `
						<h3>click the link</h3><br />
						<a href="http://localhost:5173/${verifycode}/verify"> HERE </a><br />
						<p>Thanks.</p>`,
      };

      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log("ERROR sending mail: ", err);
          return res.status(400).json({
            message: `Error sending email to ${user.email}`,
            style: "info-error",
          });
        } else {
          console.log("Email sent: ", info);
          return res.status(201).json({
            message: `Next verify your email (${user.email})`,
            style: "info-success",
          });
        }
      });
      return undefined;
    }
  } catch (error: unknown) {
    console.error("POST /api/users error", error);
    return res
      .status(500)
      .json({ message: "Error on server. Try again.", style: "info-error" });
    // next(error);
  }
}) as RequestHandler);

// api/users/:code/verify

usersRouter.get("/:code/verify", (async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<User[] | void> => {
  try {
    const code = req.params.code;
    const encodedCode = encodeURIComponent(code);

    const sql = `SELECT * FROM users WHERE verifycode = $1`;
    const result = await pool.query(sql, [encodedCode]);

    console.log("VERIFY USER", result.rows);
    if (result.rowCount === 1 && result.rows[0].status === 1) {
      const updateStatus = `UPDATE users SET status = $1 WHERE verifycode = $2`;
      await pool.query(updateStatus, [2, encodedCode]);
      res.status(200).json(result.rows[0] as User[]);
    } else if (result.rowCount === 1) {
      res.status(200).json(result.rows[0] as User[]);
    }
  } catch (error: unknown) {
    console.error("GET /api/users error", error);
    res.status(500).json({ error: "GET /api/users/:code/verify" });
    next(error);
  }
}) as RequestHandler);

export default usersRouter;
