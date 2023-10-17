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
    console.log("Axios new user", newUser);
    const res = await axios.post(baseUrl, newUser);
    console.log("res new user ", res.data);
    return res.data;
  } catch (error: unknown) {
    console.error("Error creating new users", error);
  }
};

const userService = { getUsers, newUser };
export default userService;
