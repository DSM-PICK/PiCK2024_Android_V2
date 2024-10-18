import { useEffect, useRef } from "react";
import { colorTable } from "@/constants";
import { Animated } from "react-native";
import { useTheme } from "./useTheme";

export const useColor = () => {
  const { theme } = useTheme();
  const first = useRef(true);
  const colorAnim = useRef(new Animated.Value(theme === "dark" ? 1 : 0)).current; // 0 - 라이트, 1 - 다크

  const start = () =>
    Animated.timing(colorAnim, {
      toValue: theme === "dark" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => colorAnim.setValue(theme === "dark" ? 1 : 0));

  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      start();
    }
  }, [theme]);

  const color = (
    type: keyof typeof colorTable,
    index?: "white" | "black" | number,
    noAnim?: boolean
  ) => {
    if (type === "error" || type === "bg") {
      return noAnim
        ? colorTable[type][theme]
        : colorAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [colorTable[type]["light"], colorTable[type]["dark"]],
          });
    } else {
      return noAnim
        ? colorTable[type][theme][index]
        : colorAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [colorTable[type]["light"][index], colorTable[type]["dark"][index]],
          });
    }
  };

  return { color };
};
