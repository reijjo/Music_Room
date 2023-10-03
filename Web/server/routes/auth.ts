import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";
import {
  DecodedToken,
  FacebookUser,
  GoogleTokenObj,
  GoogleUser,
} from "../utils/types";

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

  const address: string = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;

  console.log("back token", token);
  console.log("back address", address);

  try {
    const result = await fetch(address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: GoogleUser = (await result.json()) as GoogleUser;
    const secret = config.JWT_SECRET as string;
    const userForToken = {
      id: data.id,
      email: data.email,
      username: data.name,
      name: data.name,
      given_name: data.given_name,
      family_name: data.family_name,
      picture: data.picture,
      locale: data.locale,
    };

    // ADD TO DATABASE ID AS USER_ID, EMAIL, NAME, PICTURE

    const googleToken = jwt.sign(userForToken, secret, {
      expiresIn: 60 * 120,
    });

    console.log("back result", data);
    res.status(200).send({ user: data, googleToken });
  } catch (error) {
    console.log("Error fetching Google user", error);
  }
});

authRouter.post("/fb/token", async (req: Request, res: Response) => {
  try {
    const userInfo = (await req.body) as FacebookUser;

    const secret = config.JWT_SECRET as string;
    const userForToken = {
      id: userInfo.id,
      username: userInfo.name,
      name: userInfo.name,
      short_name: userInfo.short_name,
      picture: userInfo.picture,
    };
    const fbToken = jwt.sign(userForToken, secret, {
      expiresIn: 60 * 120,
    });

    res.status(200).send({ user: userInfo, fbToken });
  } catch (error) {
    console.log("Error on fb user", error);
  }
});

export { authRouter };
