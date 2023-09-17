import express, { Application } from "express";
import cors from "cors";
import { connectDB } from "./utils/dbConnection";
import { usersRouter } from "./routes/users";

const app: Application = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/users", usersRouter);

export { app };
