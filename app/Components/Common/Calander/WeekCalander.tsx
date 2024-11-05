import { useBottomSheet, useTheme } from "@/hooks";
import { View } from "../AnimatedComponents";
import { IProp } from "../Calander";
import { useEffect } from "react";
import { Icon } from "../Icon";
import { Calander } from "./";

export const WeekCalander = (props: IProp) => {
  const { color } = useTheme();
  const { open, component, set } = useBottomSheet();

  useEffect(() => {
    if (!!component) {
      set({ component: <Calander {...props} /> });
    }
  }, [props]);

  return (
    <View
      style={{
        width: "100%",
        padding: 20,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 30,
        backgroundColor: color("bg"),
        alignItems: "center",
        gap: 20,
      }}
    >
      <Icon name="Arrrow" rotate="up" size={20} onPress={() => open(<Calander {...props} />)} />
      <Calander {...props} weekOnly />
    </View>
  );
};
