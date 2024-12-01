import { captureException } from "@sentry/react-native";
import { bulkSetItem, getItem } from "@/utils";
import axios, { AxiosError } from "axios";
export * from "./types";

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 1000 * 30,
});

instance.interceptors.request.use(
  async (res) => {
    const token = await getItem("access_token");
    if (token && res.url !== "/user/login" && res.url !== "/user/refresh") {
      res.headers["Authorization"] = `Bearer ${token}`;
    }
    return res;
  },
  (err) => {
    throw err;
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    if (
      err.response.status === 401 &&
      err.request.url !== "/user/login" &&
      err.request.url !== "/user/refresh"
    ) {
      // 토큰만료 값 뭔지 모름, 있다가 도경이에게 물어볼 것
      const token = await getItem("refresh_token");
      instance
        .put("/user/refresh", null, { headers: { "X-Refresh-Token": token } })
        .then((res) => {
          bulkSetItem([
            ["access_token", res?.data.access_token],
            ["refresh_token", res?.data.refresh_token],
          ]);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      captureException(err);
      throw err.response.status;
    }
  }
);
