import { config } from "./config";
import { Pool } from "pg";

// const isTest = process.env.NODE_ENV === "test";

const dbConfig = {
  user: config.POSTGRES_USER,
  host: config.TEST_PGHOST,
  database: config.TEST_POSTGRES_DB,
  password: config.PGADMIN_DEFAULT_PASSWORD,
  port: config.TEST_PGPORT,
};

// const dbConfig = {
//   user: config.POSTGRES_USER,
//   host: isTest ? config.TEST_PGHOST : config.PGHOST,
//   database: isTest ? config.TEST_POSTGRES_DB : config.POSTGRES_DB,
//   password: config.PGADMIN_DEFAULT_PASSWORD,
//   port: isTest ? config.TEST_PGPORT : config.PGPORT,
// };

export const pool = new Pool(dbConfig);

export const connectDB = () => {
  pool.connect((err, _client, _release) => {
    if (err) {
      console.log("Error acquiring client", err.stack);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectDB, 5000);
    } else {
      console.log(
        `Connected to database ${dbConfig.database?.toUpperCase()} port ${
          dbConfig.port
        }`
      );
      // console.log(`Connected to database ${config.POSTGRES_DB}`);
    }
  });
};
