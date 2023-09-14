import dotenv from "dotenv";
import { ConfigType } from "./types";
dotenv.config();

const PORT: number = parseInt(process.env.PORT || "", 10);

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB = process.env.POSTGRES_DB;
const PGADMIN_DEFAULT_PASSWORD = process.env.PGADMIN_DEFAULT_PASSWORD;
const PGHOST = process.env.PGHOST;
const PGPORT: number = parseInt(process.env.PGPORT || "", 10);

export const config: ConfigType = {
  PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  PGADMIN_DEFAULT_PASSWORD,
  PGHOST,
  PGPORT,
};
