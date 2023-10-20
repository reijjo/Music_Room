import supertest from "supertest";
import { app } from "../app";

const api = supertest(app);

describe("Creating a user", () => {
  test("get all users", async () => {
    await api.get("/api/users").expect(200);
  });
  // test("ok just a basic user", async () => {
  //   const user = {
  //     email: "testi@ukko.com",
  //     passwd: "salainen",
  //     username: "testiukko",
  //     age: "44",
  //     gender: "Male",
  //   };
  //   console.log("user", user);
  //   await api.post("/api/users").send(user).expect(201);
  // });
});

test("true is true??", () => {
  expect(true).toBe(true);
});
