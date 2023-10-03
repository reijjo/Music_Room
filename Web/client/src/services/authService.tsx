import axios from "axios";
import { FacebookUser, GoogleTokenObj } from "../utils/types";

const baseUrl = "/api/auth";

const refreshToken = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}/refresh-token`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data.message);
    } else {
      console.log("Error fetching token", error);
    }
  }
};

const googleLogin = async (token: GoogleTokenObj) => {
  try {
    const response = await axios.post(`${baseUrl}/google/token`, token);
    return response.data;
  } catch (error) {
    console.log("Google token axios error", error);
  }
};

const fbLogin = async (info: FacebookUser) => {
  try {
    const response = await axios.post(`${baseUrl}/fb/token`, info);
    return response.data;
  } catch (error) {
    console.log("FB token stuff error", error);
  }
};

const authService = { refreshToken, googleLogin, fbLogin };

export default authService;
