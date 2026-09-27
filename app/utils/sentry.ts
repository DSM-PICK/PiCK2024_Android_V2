import * as Sentry from "@sentry/react-native";
import type { Breadcrumb, ErrorEvent } from "@sentry/react-native";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

const FILTERED = "[Filtered]";

// apis/types.ts 기준 개인정보/인증 관련 필드명
const SENSITIVE_KEYS = new Set([
  "account_id",
  "user_id",
  "user_name",
  "teacher_name",
  "name",
  "grade",
  "class_num",
  "num",
  "birth_day",
  "email",
  "mail",
  "code",
  "password",
  "reason",
  "content",
  "profile",
  "image",
  "access_token",
  "refresh_token",
  "device_token",
  "authorization",
  "x-refresh-token",
]);

const scrubString = (value: string) =>
  value
    .replace(/eyJ[\w-]+\.[\w-]+\.[\w-]*/g, FILTERED)
    .replace(/Bearer\s+[\w.~+/-]+=*/gi, `Bearer ${FILTERED}`);

const scrubValue = (value: unknown, depth = 0): unknown => {
  if (typeof value === "string") return scrubString(value);
  if (depth > 5 || typeof value !== "object" || value === null) return value;
  if (Array.isArray(value)) return value.map((v) => scrubValue(v, depth + 1));

  return Object.fromEntries(
    Object.entries(value).map(([key, v]) => [
      key,
      SENSITIVE_KEYS.has(key.toLowerCase())
        ? FILTERED
        : scrubValue(v, depth + 1),
    ]),
  );
};

const stripQuery = (url: string) => url.split("?")[0];

const beforeBreadcrumb = (breadcrumb: Breadcrumb): Breadcrumb | null => {
  if (breadcrumb.category === "console") return null;

  if (breadcrumb.message) {
    breadcrumb.message = scrubString(breadcrumb.message);
  }
  if (breadcrumb.data) {
    const data = scrubValue(breadcrumb.data) as Record<string, unknown>;
    if (typeof data.url === "string") data.url = stripQuery(data.url);
    breadcrumb.data = data;
  }
  return breadcrumb;
};

const beforeSend = (event: ErrorEvent): ErrorEvent => {
  delete event.user;
  delete event.request;
  delete event.server_name;
  if (event.contexts?.device) delete event.contexts.device.name;

  if (event.message) event.message = scrubString(event.message);
  event.exception?.values?.forEach((exception) => {
    if (exception.value) exception.value = scrubString(exception.value);
  });
  if (event.extra) {
    event.extra = scrubValue(event.extra) as Record<string, unknown>;
  }
  return event;
};

export const initSentry = () => {
  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: __DEV__ ? "development" : "production",
    sendDefaultPii: false,
    attachScreenshot: false,
    attachViewHierarchy: false,
    enableAutoPerformanceTracing: false,
    beforeSend,
    beforeBreadcrumb,
  });
};

type ForcedLogoutReason =
  | "no_refresh_token"
  | "refresh_rejected"
  | "refresh_server_error"
  | "refresh_timeout"
  | "refresh_network_error"
  | "unexpected_error";

const getLogoutReason = (
  hasRefreshToken: boolean,
  error: unknown,
): ForcedLogoutReason => {
  if (!hasRefreshToken) return "no_refresh_token";
  if (!(error instanceof AxiosError)) return "unexpected_error";

  const status = error.response?.status;
  if (status)
    return status >= 500 ? "refresh_server_error" : "refresh_rejected";
  if (
    error.code === AxiosError.ECONNABORTED ||
    error.code === AxiosError.ETIMEDOUT
  ) {
    return "refresh_timeout";
  }
  return "refresh_network_error";
};

// 토큰 원문은 보내지 않고, JWT의 iat/exp로 계산한 초 단위 값만 보냄
const getTokenTiming = (token: string | null) => {
  try {
    const payload = token?.split(".")[1];
    if (!payload) return { age_sec: null, expires_in_sec: null };

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const { iat, exp } = JSON.parse(atob(base64));
    const now = Math.floor(Date.now() / 1000);

    return {
      age_sec: typeof iat === "number" ? now - iat : null,
      expires_in_sec: typeof exp === "number" ? exp - now : null,
    };
  } catch {
    return { age_sec: null, expires_in_sec: null };
  }
};

interface IForcedLogout {
  error: unknown;
  accessToken: string | null;
  refreshToken: string | null;
  request?: InternalAxiosRequestConfig;
  concurrentRefreshes: number;
  lastRefreshSuccessAt: number;
}

export const reportForcedLogout = ({
  error,
  accessToken,
  refreshToken,
  request,
  concurrentRefreshes,
  lastRefreshSuccessAt,
}: IForcedLogout) => {
  try {
    const reason = getLogoutReason(!!refreshToken, error);
    const axiosError = error instanceof AxiosError ? error : null;
    const access = getTokenTiming(accessToken);
    const refresh = getTokenTiming(refreshToken);

    Sentry.captureMessage("forced_logout", {
      level: "warning",
      fingerprint: ["forced_logout", reason],
      tags: {
        logout_reason: reason,
        refresh_status: axiosError?.response?.status ?? "none",
      },
      contexts: {
        forced_logout: {
          trigger_method: request?.method ?? null,
          trigger_path: request?.url ? stripQuery(request.url) : null,
          error_code: axiosError?.code ?? null,
          access_token_age_sec: access.age_sec,
          access_token_expires_in_sec: access.expires_in_sec,
          refresh_token_age_sec: refresh.age_sec,
          refresh_token_expires_in_sec: refresh.expires_in_sec,
          concurrent_refreshes: concurrentRefreshes,
          ms_since_last_refresh: lastRefreshSuccessAt
            ? Date.now() - lastRefreshSuccessAt
            : null,
        },
      },
    });
  } catch {
    // 에러 리포팅 실패가 로그아웃 흐름에 영향을 주지 않도록 무시
  }
};
