import axios from "axios";
import { API_URL, IS_SERVER, STORAGE } from "../constants/common";

const request = axios.create({
  baseURL: API_URL,
});

request.interceptors.request.use(
  function (config) {
    if (!IS_SERVER) {
      const token = localStorage.getItem(STORAGE.TOKEN);

      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.toJSON()?.status === 401) {
      if (!IS_SERVER) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default request;
