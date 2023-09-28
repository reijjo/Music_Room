import axios from "axios";
import { LoginCredentials, RegisterData } from "../utils/types";
// import { ErrorResponse } from "react-router-dom";

const baseUrl = "/api/users";

const regUser = async (newUser: RegisterData) => {
  try {
    const response = await axios.post(`${baseUrl}`, newUser);
    return response.data;
  } catch (error) {
    console.error("Error on registering user: ", error);
  }
};

const verifyUser = async (verifycode: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${verifycode}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying user", error);
  }
};

const logUser = async (user: LoginCredentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, user);
    return response.data;
  } catch (error) {
    console.log("Error on login", error);
  }
};

const getToken = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}/token`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data.message);
    } else {
      console.log("Error fetching token", error);
    }
  }
};

const userService = {
  regUser,
  verifyUser,
  logUser,
  getToken,
};

export default userService;
