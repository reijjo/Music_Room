import express, { Application } from "express";
import cors from "cors";
import passport from "passport";
import { connectDB } from "./utils/dbConnection";
import { usersRouter } from "./routes/users";
import { authRouter } from "./routes/auth";
import helmet from "helmet";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(
  // helmet.contentSecurityPolicy({
  //   directives: {
  //     defaultSrc: ["'none'"],
  //     fontSrc: ["'self'", "https://fonts.googleapis.com"],
  //   },
  // })
  helmet({ contentSecurityPolicy: false })
);

connectDB();

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

export { app };
