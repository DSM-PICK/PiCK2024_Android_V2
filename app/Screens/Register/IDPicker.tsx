import { useBottomSheet, useTheme } from "@/hooks";
import { View, Text, Button, ScrollPicker } from "@/Components";
import { useState } from "react";

const idTable = {
  grade: Array.from({ length: 3 }, (_, k) => k + 1),
  class: Array.from({ length: 4 }, (_, k) => k + 1),
  number: Array.from({ length: 17 }, (_, k) => k + 1),
};
export type changePropType = { grade: number; class: number; number: number };
export type changeType = (event: changePropType) => void;

interface IProp {
  onChange: changeType;
}

export const IDPicker = ({ onChange }: IProp) => {
  const { close } = useBottomSheet();
  const { color } = useTheme();

  const [state, setState] = useState({ grade: 1, class: 1, number: 1 });

  return (
    <>
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="label"
        fontLevel={1}
        style={{ alignSelf: "flex-start" }}
      >
        학번을 선택해주세요
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
        <View
          style={{ width: "100%", position: "absolute", alignSelf: "center" }}
        >
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
        <ScrollPicker
          items={idTable.grade.map(String)}
          onScroll={(e) => setState({ ...state, grade: Number(e) })}
          suffix="학년"
          id="grade"
        />
        <ScrollPicker
          items={idTable.class.map(String)}
          onScroll={(e) => setState({ ...state, class: Number(e) })}
          suffix="반"
          id="class"
        />
        <ScrollPicker
          items={idTable.number.map(String)}
          onScroll={(e) => setState({ ...state, number: Number(e) })}
          suffix="번"
          id="number"
        />
      </View>

      <Button
        onPress={() => {
          close();
          onChange(state);
        }}
      >
        선택 완료
      </Button>
    </>
  );
};
