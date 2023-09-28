import dotenv from "dotenv";
import { ConfigType } from "./types";
dotenv.config();

const PORT: number = parseInt(process.env.PORT || "", 10);

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB = process.env.POSTGRES_DB;
const PGADMIN_DEFAULT_PASSWORD = process.env.PGADMIN_DEFAULT_PASSWORD;
const PGHOST = process.env.PGHOST;
const PGPORT: number = parseInt(process.env.PGPORT || "", 10);

const EMAIL_USER = process.env.EMAIL_USERNAME;
const EMAIL_PASSWD = process.env.EMAIL_PASSWORD;

const JWT_SECRET = process.env.JWT_SECRET;

const FB_APP_ID = process.env.FB_APP_ID as string;
const FB_APP_SECRET = process.env.FB_APP_SECRET as string;

export const config: ConfigType = {
  PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  PGADMIN_DEFAULT_PASSWORD,
  PGHOST,
  PGPORT,
  EMAIL_USER,
  EMAIL_PASSWD,
  JWT_SECRET,
  FB_APP_ID,
  FB_APP_SECRET,
};
