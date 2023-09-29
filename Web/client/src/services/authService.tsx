import axios from "axios";
import { GoogleTokenObj } from "../utils/types";

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
  console.log("Axios google", token);
  try {
    const response = await axios.post(`${baseUrl}/google/token`, token);

    console.log(response);

    return response;
  } catch (error) {
    console.log("Google token axios error", error);
  }
};

const authService = { refreshToken, googleLogin };

export default authService;
