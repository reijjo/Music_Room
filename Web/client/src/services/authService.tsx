import axios from "axios";

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

const authService = { refreshToken };

export default authService;
