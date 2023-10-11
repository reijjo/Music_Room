import { app } from "./app";
import { config } from "./utils/config";

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

console.log("CONFING", config);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
