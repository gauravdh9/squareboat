import axios from "axios";
const BASE_URL = "https://jobs-api.squareboat.info/api/v1/";
export default axios.create({
  baseURL: BASE_URL,
});
