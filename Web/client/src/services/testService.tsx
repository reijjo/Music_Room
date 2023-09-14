import axios from "axios";

// const baseUrl = "http://localhost:3001/ping";
// const baseUrl = "/ping";

const testAxios = () => {
  const req = axios.get(`/ping`);
  return req.then((response) => response.data);
};

const testService = {
  testAxios,
};
export default testService;
