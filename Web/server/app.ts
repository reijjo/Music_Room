import express, { Application } from "express";
import cors from "cors";
import { connectDB } from "./utils/dbConnection";
// import { connectDB } from "./utils/dbConnection";

const app: Application = express();
app.use(express.json());
app.use(cors());

connectDB();

export { app };
