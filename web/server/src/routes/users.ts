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

    console.log("resulstwors", result.rows);

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
      const verifycode = (
        await bcrypt.hash(`${user.passwd}${user.username}`, 10)
      ).replace("/", "");
      const userstatus = 1;

      // Add user to database

      console.log("before sql");
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
      return res.status(201).json({
        message: `Next verify your email (${user.email})`,
        style: "info-success",
      });
    }
  } catch (error: unknown) {
    console.error("POST /api/users error", error);
    return res
      .status(500)
      .json({ message: "Error on server. Try again.", style: "info-error" });
    // next(error);
  }
}) as RequestHandler);

export default usersRouter;
