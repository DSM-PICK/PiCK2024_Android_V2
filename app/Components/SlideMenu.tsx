import { useState } from "react";
import { View, Text } from "./Common";
import { useColor } from "@/hooks";

export const SlideMenu = () => {
  const [opened, setOpened] = useState(false);
  const { color } = useColor();

  return (
    <View
      style={{
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: color("gray", 50),
      }}
    >
      <Text color="main" level="100" type="label" fontLevel={1}>
        Test
      </Text>
    </View>
  );
};
