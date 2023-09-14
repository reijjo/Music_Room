import { app } from "./app";
import { Request, Response } from "express";

import { config } from "./utils/config";

app.get("/ping", (_req: Request, res: Response) => {
  try {
    console.log("someone pinged here");
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    res.send("pong");
  } catch (error) {
    console.error("Error handling ping:", error);
  }
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
