/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../utils/dbConnection";
import { UserFull } from "../utils/types";

const usersRouter = express.Router();

// api/users

usersRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const sql = `SELECT * FROM users`;
      const result = await pool.query(sql);

      res.status(200).json(result.rows);
    } catch (error: unknown) {
      console.error("GET /api/users error", error);
      next(error);
    }
  }
);

usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as UserFull;

      // Hash the password and make a verifycode for forget password section

      const passwdHash = await bcrypt.hash(user.passwd, 10);
      const verifycode = (
        await bcrypt.hash(`${user.passwd}${user.username}`, 10)
      ).replace("/", "");
      const userstatus = 1;

      // console.log("user", user);
      // console.log("passwdjash", passwdHash);
      // console.log("verifycode", verifycode);
      // console.log("userstastat", userstatus);

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
      res.status(201).json({
        message: `Next verify your email (${user.email})`,
        style: "info-success",
      });
      console.log("JEEAAA POST");
    } catch (error: unknown) {
      console.error("POST /api/users error", error);
      res
        .status(500)
        .json({ message: "Error on server. Try again.", style: "info-error" });
      next(error);
    }
  }
);

export default usersRouter;
