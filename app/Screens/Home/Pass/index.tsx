import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Submitted } from "./Submitted";
import { Waiting } from "./Waiting";
import { View } from "@/Components";
import { useTheme } from "@/hooks";
import { getItem } from "@/utils";

export const Pass = () => {
  const { color } = useTheme();
  const [data, setData] = useState(null);
  const ws = useRef<null | WebSocket>(null);

  useEffect(() => {
    const socket = async () => {
      //@ts-expect-error
      ws.current = new WebSocket(`${String(process.env.EXPO_PUBLIC_BASE_URL).replace("https", "wss")}/main`, null, {
        headers: { Authorization: `${await getItem("access_token")}` },
      });

      ws.current.onopen = () => ws.current.send("");

      ws.current.onerror = (error) => console.log(`오류 발생 (${JSON.stringify(error)})`);

      ws.current.onmessage = ({ data: res }) => setData(JSON.parse(res));
    };

    socket();

    return () => ws.current.close();
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
