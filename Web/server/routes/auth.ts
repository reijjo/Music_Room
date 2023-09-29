import express, { Request, Response } from "express";
// import { pool } from "../utils/dbConnection";
import jwt from "jsonwebtoken";
// import passport from "passport";
// import { Strategy as FacebookStrategy } from "passport-facebook";
import { config } from "../utils/config";
import { DecodedToken, GoogleTokenObj } from "../utils/types";

const authRouter = express.Router();

authRouter.get("/refresh-token", (req: Request, res: Response) => {
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

      const oldTokenData = decoded as DecodedToken;
      console.log("USER AUTH AUTH AUTH", oldTokenData);

      const newTokenData = {
        id: oldTokenData.id,
        user: oldTokenData.user,
      };

      const newToken = jwt.sign(newTokenData, secret, { expiresIn: 60 * 120 });

      return res.status(200).json({
        message: "Token refreshed",
        newToken,
      });
    });
  }
});

authRouter.post("/google/token", async (req: Request, res: Response) => {
  const tokenObj = (await req.body) as GoogleTokenObj;
  const token = tokenObj.access_token;

  // const address = tokenObj.scope.split(" ")[3];
  // const address = "https://www.googleapis.com/auth/userinfo.profile";
  const address: string = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;

  console.log("back token", token);
  console.log("back address", address);

  try {
    const result = await fetch(address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: unknown = await result.json();

    console.log("back result", data);
    res.send(data);
  } catch (error) {
    console.log("Error fetching Google user", error);
  }
});

// oauth / passport facebook login
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: config.FB_APP_ID,
//       clientSecret: config.FB_APP_SECRET,
//       callbackURL: "http://localhost:3000/api/auth/facebook/callback",
//     },
//     () =>
//       (
//         accessToken: string,
//         refreshToken: string,
//         profile: Profile,
//         callback: () => void
//       ) => {
//         console.log(accessToken, refreshToken, profile, callback);
//       }
//   )
// );
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: config.FB_APP_ID,
//       clientSecret: config.FB_APP_SECRET,
//       callbackURL: "/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       // save the profile on the Database
//       // Save the accessToken and refreshToken if you need to call facebook apis later on
//       console.log(accessToken, refreshToken);
//       return cb(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj as object);
// });

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// authRouter.get("/facebook", passport.authenticate("facebook"));

// authRouter.get(
//   "/facebook/callback",
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   passport.authenticate(
//     "facebook",
//     { failureRedirect: "/login" },
//     () => (_req: Request, res: Response) => {
//       res.redirect("/logged");
//     }
//   )
// );
// authRouter.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: `${config.FRONTEND_HOST}/login`,
//   }),
//   (_req, res) => {
//     res.send(`${config.FRONTEND_HOST}/logged`);
//   }
// );

export { authRouter };
