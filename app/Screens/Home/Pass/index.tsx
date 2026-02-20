import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Submitted } from "./Submitted";
import { Waiting } from "./Waiting";
import { View } from "@/Components";
import { useTheme } from "@/hooks";
import { getItem } from "@/utils";
import EventSource from "react-native-sse";

const MAX_RECONNECT_ATTEMPTS = 5;
const INITIAL_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 30000;

export const Pass = () => {
  const { color } = useTheme();
  const [data, setData] = useState(null);
  const sse = useRef<null | EventSource>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);
  const isManuallyClosed = useRef(false);

  const calculateBackoffDelay = (attempt: number): number => {
    return Math.min(
      INITIAL_RECONNECT_DELAY * Math.pow(2, attempt),
      MAX_RECONNECT_DELAY,
    );
  };

  const cleanupSSE = () => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }
    if (sse.current) {
      sse.current.close();
      sse.current = null;
    }
  };

  const connectSSE = useCallback(async () => {
    if (!isMounted.current || isManuallyClosed.current) {
      return;
    }

    try {
      const accessToken = await getItem("access_token");

      if (!accessToken) {
        console.warn("[SSE] Access token not found");
        return;
      }

      cleanupSSE();

      sse.current = new EventSource(
        `${process.env.EXPO_PUBLIC_BASE_URL}event`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      sse.current.addEventListener("message", ({ data: dataString }) => {
        try {
          const data = JSON.parse(dataString);
          if (isMounted.current) {
            if (data.type === "NONE") {
              setData(null);
            } else {
              setData(data);
            }
          }
        } catch (parseError) {
          console.error("[SSE] Message parse error:", parseError);
        }
      });

      sse.current.addEventListener("error", (error) => {
        console.warn("[SSE] Connection error:", error);

        if (sse.current?.status === sse.current.CLOSED) {
          if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
            const delay = calculateBackoffDelay(reconnectAttempts.current);
            console.log(
              `[SSE] Reconnecting in ${delay}ms (attempt ${reconnectAttempts.current + 1}/${MAX_RECONNECT_ATTEMPTS})`,
            );
            reconnectTimeoutId.current = setTimeout(() => {
              reconnectAttempts.current += 1;
              connectSSE();
            }, delay);
          } else {
            console.error("[SSE] Max reconnection attempts reached");
          }
        }
      });

      sse.current.addEventListener("open", () => {
        console.log("[SSE] Connection established");
        reconnectAttempts.current = 0;
      });

      reconnectAttempts.current += 1;
    } catch (error) {
      console.error("[SSE] Connection setup error:", error);

      if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
        const delay = calculateBackoffDelay(reconnectAttempts.current);
        reconnectTimeoutId.current = setTimeout(() => {
          reconnectAttempts.current += 1;
          connectSSE();
        }, delay);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    isManuallyClosed.current = false;
    connectSSE();

    return () => {
      isMounted.current = false;
      isManuallyClosed.current = true;
      cleanupSSE();
    };
  }, [connectSSE]);

  return (
    !!data && (
      <View style={{ ...styles.container, backgroundColor: color("gray", 50) }}>
        {data?.user_name ? (
          <Submitted {...data} />
        ) : (
          <Waiting type={data?.type} />
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
