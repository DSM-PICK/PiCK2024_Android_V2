import axios from "axios";
export * from "./types";
export * from "./paths";

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 1000 * 30,
});

instance.interceptors.request.use(
  (res) => res,
  (err) => {
    throw err;
  }
);

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    throw err;
  }
);
