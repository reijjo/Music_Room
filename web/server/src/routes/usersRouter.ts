/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, NextFunction } from "express";
import { pool } from "../utils/dbConnection";

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
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "wow cool" });
      console.log("JEEAAA POST");
    } catch (error: unknown) {
      console.error("POST /api/users error", error);
      next(error);
    }
  }
);

export default usersRouter;
