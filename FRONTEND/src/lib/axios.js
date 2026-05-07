import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

  //ANY URL IF NOT IN DEVELOPMENT STATE THAT IS IN PRODUCTION STATE


export const axiosInstance = axios.create({
    baseURL : BASE_URL,
    withCredentials : true, //send cookies with every request
});