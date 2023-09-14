import axios from "axios";

const baseUrl = "http://localhost:3001/ping";

const testAxios = () => {
  const req = axios.get(`${baseUrl}`);
  return req.then((response) => response.data);
};

const testService = {
  testAxios,
};
export default testService;
