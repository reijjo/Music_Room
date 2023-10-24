import axios from "axios";
import { UserData } from "../utils/types";

const baseUrl = "http://localhost:3001/api/users";

// api/users

const getUsers = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching all users from database", error);
  }
};

const newUser = async (newUser: UserData) => {
  try {
    const res = await axios.post(baseUrl, newUser);
    console.log("res new user ", res.data);
    return res.data;
  } catch (error: unknown) {
    console.error("Error creating new users", error);
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

// api/users/:code/verify

const verifyUser = async (code: string) => {
  console.log("AXios code", code);
  try {
    const res = await axios.get(`${baseUrl}/${code}/verify`);
    return res.data;
  } catch (error: unknown) {
    console.error("Error verifying user", error);
  }
};

const userService = { getUsers, newUser, verifyUser };
export default userService;
