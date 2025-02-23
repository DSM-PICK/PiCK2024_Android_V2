import { useBottomSheet, useTheme, useToast } from "@/hooks";
import { View, Text, Button, ScrollPicker } from "./Common";
import { useState } from "react";

const timeTable = {
  hour: Array.from({ length: 17 }, (_, k) => k + 8),
  minute: Array.from({ length: 60 }, (_, k) => k),
  class: Array.from({ length: 10 }, (_, k) => k + 1),
};
export type typeType = "time" | "class" | "classMulti";
export type changePropType = { hour: string; minute: string };
export type changeType = (event: changePropType, id?: string) => void;

interface IProp {
  type: typeType;
  title: string;
  buttonTitle: string;
  id?: string;
  onEnd: changeType;
}

export const TimePicker = ({ type, title, buttonTitle, onEnd, id }: IProp) => {
  const { close } = useBottomSheet();
  const { color } = useTheme();

  const [time, setTime] = useState({ hour: "8", minute: "0" });

  return (
    <>
      <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1} style={{ alignSelf: "flex-start" }}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 40,
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "100%", position: "absolute", alignSelf: "center" }}>
          <View
            style={{
              position: "relative",
              width: "100%",
              height: 40,
              backgroundColor: color("main", 50, true),
              borderRadius: 14,
              bottom: 3,
            }}
          />
        </View>

        {type === "time" && (
          <>
            <ScrollPicker items={timeTable.hour.map(String)} onScroll={(e) => setTime({ ...time, hour: e })} suffix="시" id="hour" />
            <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4} style={{ height: 30 }}>
              -
            </Text>
            <ScrollPicker items={timeTable.minute.map(String)} onScroll={(e) => setTime({ ...time, minute: e })} suffix="분" id="minute" />
          </>
        )}
        {type === "class" && <ScrollPicker items={timeTable.class.map(String)} onScroll={(e) => setTime({ ...time, hour: e })} suffix="교시" />}
        {type === "classMulti" && (
          <>
            <ScrollPicker items={timeTable.class.map(String)} onScroll={(e) => setTime({ ...time, hour: e })} suffix="교시" id="start" />
            <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4} style={{ height: 30 }}>
              -
            </Text>
            <ScrollPicker items={timeTable.class.map(String)} onScroll={(e) => setTime({ ...time, minute: e })} suffix="교시" id="end" />
          </>
        )}
      </View>

      <Button
        onPress={() => {
          close();
          onEnd(time, id);
        }}
        disabled={type === "classMulti" && Number(time.hour) > Number(time.minute)}
      >
        {buttonTitle}
      </Button>
    </>
  );
};
