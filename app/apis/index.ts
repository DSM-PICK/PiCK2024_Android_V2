import { bulkSetItem, bulkDelItem, getItem, navigate } from "@/utils";
import axios, { AxiosError } from "axios";
export * from "./types";

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 1000 * 30,
});

let tokenCache: {
  access_token: string | null;
  refresh_token: string | null;
  timestamp: number;
} = {
  access_token: null,
  refresh_token: null,
  timestamp: 0,
};

const CACHE_EXPIRATION = 5 * 60 * 1000;

const refreshTokenCache = async () => {
  const [access_token, refresh_token] = await Promise.all([
    getItem("access_token"),
    getItem("refresh_token"),
  ]);
  
  tokenCache = {
    access_token,
    refresh_token,
    timestamp: Date.now(),
  };
  
  return tokenCache;
};

const getToken = async () => {
  if (!tokenCache.access_token || !tokenCache.timestamp || Date.now() - tokenCache.timestamp > CACHE_EXPIRATION) {
    await refreshTokenCache();
  }
  
  return tokenCache;
};

instance.interceptors.request.use(
  async (res) => {
    const { access_token } = await getToken();
    if (access_token && res.url !== "/user/login" && res.url !== "/user/refresh") {
      res.headers["Authorization"] = `Bearer ${access_token}`;
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
    if (err.response?.status === 401 && err.config?.url !== "/user/login") {
      // 토큰만료 값 뭔지 모름, 있다가 도경이에게 물어볼 것
      const { refresh_token } = await getToken();
      axios
        .put(process.env.EXPO_PUBLIC_BASE_URL + "/user/refresh", null, { headers: { "X-Refresh-Token": refresh_token } })
        .then(async (res) => {
          const { data } = res.data!;

          await bulkSetItem([
            ["access_token", data.access_token],
            ["refresh_token", data.refresh_token],
          ]);

          tokenCache = {
            access_token: res?.data.access_token,
            refresh_token: res?.data.refresh_token,
            timestamp: Date.now(),
          };
        })
        .catch(async () => {
          await bulkDelItem(["access_token", "refresh_token"]);
          tokenCache.access_token = null;
          tokenCache.refresh_token = null;
          navigate("로그인");
        });
    } else {
      throw err;
    }
  }
);