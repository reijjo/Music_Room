import axios from "axios";
import { RegisterData } from "../utils/types";

const baseUrl = "/api/users";

const regUser = async (newUser: RegisterData) => {
  try {
    const response = await axios.post(`${baseUrl}`, newUser);
    return response.data;
  } catch (error) {
    console.error("Error on registering user: ", error);
  }
};

const userService = {
  regUser,
};

export default userService;
