import express, { Request, Response } from "express";
import {
  DecodedToken,
  FullUserData,
  LoginCredentials,
  RegisterData,
  User,
} from "../utils/types";
import checks from "../utils/regChecks";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { config } from "../utils/config";
import { pool } from "../utils/dbConnection";
import jwt from "jsonwebtoken";

const usersRouter = express.Router();

const sendVerifyCode = async (email: string, verifyCode: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWD,
      },
    });

    const options = {
      from: config.EMAIL_USER,
      to: email,
      subject: "TADAAA! Welcome to Music Room!",
      html: `
			<h3>click the link</h3><br />
			<a href="http://localhost:3000/${verifyCode}/verify"> HERE </a><br />
			<p>Thanks.</p>`,
    };

    await transporter.sendMail(options);
  } catch (error) {
    console.error("Error sending email!", error);
  }
};

// Route to register the user
usersRouter.post("/", async (req: Request, res: Response) => {
  const user = req.body as RegisterData;

  const emailNotif = checks.emailCheck(user.email);
  const usernameNotif = checks.usernameCheck(user.username);
  const pwNotif = checks.pwCheck(user.password);
  const ageNotif = checks.ageCheck(user.age);
  const genderNotif = checks.genderCheck(user.gender);

  // Run all the checks first

  if (emailNotif) {
    return res.send({ messageBanner: emailNotif });
  } else if (usernameNotif) {
    return res.send({ messageBanner: usernameNotif });
  } else if (pwNotif) {
    return res.send({ messageBanner: pwNotif });
  } else if (user.password !== user.confirmPassword) {
    return res.send({
      messageBanner: {
        className: "infoError",
        message: "Passwords do not match.",
      },
    });
  } else if (ageNotif) {
    return res.send({ messageBanner: ageNotif });
  } else if (genderNotif) {
    return res.send({ messageBanner: genderNotif });
  } else {
    // If everything okay, we start encrypting the password and sending registration email

    const passwdHash: string = await bcrypt.hash(user.password, 10);
    const verifyCode: string = passwdHash.replace("/", "3");

    // Add user to database
    try {
      const dupCheck = `SELECT * FROM users WHERE username = $1 OR email = $2`;
      const dupRes = await pool.query(dupCheck, [user.username, user.email]);

      if (dupRes.rowCount > 0) {
        return res.send({
          messageBanner: {
            message: "Username / Email already exists.",
            className: "infoError",
          },
        });
      } else {
        await sendVerifyCode(user.email, verifyCode);

        const addUserToDb = `
				INSERT INTO users (email, username, passwd, age, gender, verifycode)
				VALUES ($1, $2, $3, $4, $5, $6)
				`;
        // const addUserRes =
        await pool.query(addUserToDb, [
          user.email,
          user.username,
          passwdHash,
          user.age,
          user.gender,
          verifyCode,
        ]);
      }
    } catch (error) {
      console.error("Error during duplicate check", error);
      return res.send({
        messageBanner: {
          message: `Error adding user.`,
          className: "infoOK",
        },
      });
    }

    return res.send({
      messageBanner: {
        message: `Check your email ${user.email}!`,
        className: "infoOK",
      },
    });
  }
});

// For verifying user
usersRouter.get("/:code/verify", async (req: Request, res: Response) => {
  const verifycode = req.params.code;
  try {
    const sql = `SELECT username FROM users WHERE verifycode = $1`;
    const response = await pool.query(sql, [verifycode]);
    // console.log("aa", response.rows[0].username);
    if (response.rows.length > 0) {
      const username = response.rows[0].username as string;
      const updateStatus = `UPDATE users SET user_status = $1 WHERE username = $2`;
      await pool.query(updateStatus, [1, username]);
      res.send(response.rows[0]);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.error("Error verifying user", err);
  }
});

// Login route
usersRouter.post("/login", async (req: Request, res: Response) => {
  const { logincredential, password } = req.body as LoginCredentials;

  if (logincredential.length > 30 || password.length > 30) {
    return res.send({
      messageBanner: {
        message: `Too long username / email or password`,
        className: "infoError",
      },
    });
  }

  let userSQL = "";

  if (logincredential.includes("@")) {
    console.log("its an email");
    userSQL = `SELECT * FROM users WHERE email = $1`;
  } else {
    console.log("its username");
    userSQL = `SELECT * FROM users WHERE username = $1`;
  }

  try {
    const findUser = await pool.query(userSQL, [logincredential]);
    const user = findUser.rows[0] as FullUserData;

    // We check is there a user and the user status
    if (findUser.rowCount === 1) {
      if (parseInt(user.user_status) === 0) {
        return res.send({
          messageBanner: {
            message: `Verify your email!`,
            className: "infoError",
          },
        });
      } else {
        // If everything is ok we compare the passwords
        const passwdOk = await bcrypt.compare(password, user.passwd);
        if (!passwdOk) {
          return res.send({
            messageBanner: {
              message: `Check your password`,
              className: "infoError",
            },
            error: "invalid username or password",
          });
        } else {
          // set the JSON WEB TOKEN
          const userForToken = {
            id: user.id,
            user: user.email || user.username,
          };
          const secret = config.JWT_SECRET;

          if (secret) {
            const token = jwt.sign(userForToken, secret, {
              // expiresIn: 60 * 60,
              expiresIn: 60,
            });
            return res.status(200).send({
              messageBanner: {
                message: `token set`,
                className: "infoOK",
              },
              token,
              user: user,
            });
          }

          return res.send({
            extra: "extra return??",
          });
        }
      }
    } else {
      return res.send({
        messageBanner: {
          message: `No such user.`,
          className: "infoError",
        },
      });
    }
  } catch (error) {
    console.log("LOgin error", error);
    return res.send({
      messageBanner: {
        message: `An error occurred while logging in.`,
        className: "infoError",
      },
    });
  }
});

// Get user with token
usersRouter.get("/token", (req: Request, res: Response) => {
  console.log("REQ", req.headers.authorization?.split(" ")[1]);
  const token = req.headers.authorization?.split(" ")[1];
  const secret = config.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (secret) {
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const tokenData = decoded as DecodedToken;
      let getUserSQL = "";
      console.log("USER", tokenData.user);

      if (tokenData.user.includes("@")) {
        getUserSQL = `SELECT * FROM users WHERE email = $1`;
      } else {
        getUserSQL = `SELECT * FROM users WHERE username = $1`;
      }

      const getUser = await pool.query(getUserSQL, [tokenData.user]);
      const tokenUser = getUser.rows[0] as User;

      // console.log("TOKEN USER", tokenUser);

      return res.status(200).json({
        message: "Authorized",
        tokenUser,
        tokenData,
      });
    });
  }
  return undefined;
});

// Get all users
usersRouter.get("/", async (_req: Request, res: Response) => {
  const usersSQL = `SELECT * FROM users`;

  try {
    const userRes = await pool.query(usersSQL);
    const users = userRes.rows;

    res.status(200).json({
      users,
      count: users.length,
    });
  } catch (error) {
    console.log("Error fetching users", error);
  }

  console.log("hihuu");
});

export { usersRouter };
