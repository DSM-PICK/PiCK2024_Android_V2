import { bulkSetItem, getItem } from "@/utils";
import axios from "axios";
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
  async (err) => {
    if (err.response.status === 401) {
      try {
        const token = await getItem("refresh_token");
        instance
          .put("/user/refresh", null, { headers: { "X-Refresh-Token": token } })
          .then(({ data: { access_token, refresh_token } }) => {
            bulkSetItem([
              ["access_token", access_token],
              ["refresh_token", refresh_token],
            ]);
          });
      } catch {
        throw err;
      }
    } else {
      console.log(err);
      throw err;
    }
  }
);
