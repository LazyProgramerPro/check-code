export const API_URL = "https://trading-nonprod-blogapi.edsolabs.com/v1";
export const API_IMAGE_URL = (fileName) => API_URL + '/posts/files/upload/' + fileName;
// export const API_URL = "http://192.168.50.160:3001/v1";

export const STORAGE = {
  TOKEN: "token",
  USER: "user",
};

export const IS_SERVER = typeof window === "undefined";
