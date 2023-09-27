import express, { Request, Response } from "express";
// import { pool } from "../utils/dbConnection";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";
import { DecodedToken } from "../utils/types";

const authRouter = express.Router();

authRouter.get("/refresh-token", (req: Request, _res: Response) => {
  const secret = config.JWT_SECRET;
  console.log("secret", secret);

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    // return res.status(401).json({ message: "Unauthorized." });
    console.log("ei tokenii");
  }

  if (secret && token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("ERROR IN AUTH TS", err);
        // return res.status(401).json({ message: "Unauthorized" });
      }

      const user = decoded as DecodedToken;
      console.log("USER AUTH AUTH AUTH", user);
    });
  }
});

export { authRouter };
