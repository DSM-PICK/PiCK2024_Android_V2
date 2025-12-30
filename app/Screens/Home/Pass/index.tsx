import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Submitted } from "./Submitted";
import { Waiting } from "./Waiting";
import { View } from "@/Components";
import { useTheme, useToast } from "@/hooks";
import { getItem } from "@/utils";
import EventSource from "react-native-sse";

export const Pass = () => {
  const { color } = useTheme();
  const [data, setData] = useState(null);
  const sse = useRef<null | EventSource>(null);
  const { success, error } = useToast();

  useEffect(() => {
    const connectSSE = async () => {
      const accessToken = await getItem("access_token");
      sse.current = new EventSource(`${process.env.EXPO_BASE_URL}/event`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      sse.current.addEventListener("message", ({ data: status }) => {
        setData(JSON.parse(status));
      });

      // Debug range
      sse.current.addEventListener("open", (event) => {
        success(`SSE 연결 성공: ${JSON.stringify(event)}`);
      });
      sse.current.addEventListener("close", (event) => {
        error(`SSE 연결 해제: ${JSON.stringify(event)}`);
      });
      sse.current.addEventListener("error", (event) => {
        error(`SSE 오류: ${JSON.stringify(event)}`);
      });
    }

    connectSSE();

    return () => sse.current.close();
  }, []);

  return (
    !!data && (
      <View style={{ ...styles.container, backgroundColor: color("gray", 50) }}>
        {data?.userName ? <Submitted {...data} /> : <Waiting type={data?.type} />}
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
