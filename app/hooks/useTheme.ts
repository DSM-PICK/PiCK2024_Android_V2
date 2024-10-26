import { colorTable } from "@/constants";
import { getItem, setItem } from "@/utils";
import { Animated } from "react-native";
import { create } from "zustand";

interface ITheme {
  theme: Animated.Value;
  noAnimTheme: number;
  getTheme: () => "light" | "dark";
  toggleTheme: () => void;
  load: () => void;
  color: (
    type: keyof typeof colorTable,
    index?: "white" | "black" | number,
    noAnim?: boolean
  ) => any;
}

export interface IColorProp {
  colorType?: keyof typeof colorTable;
  colorLevel?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "white" | "black";
}

const themeTable: ["light", "dark"] = ["light", "dark"]; // 0: light, 1: dark
let lock = false;

export const useTheme = create<ITheme>((set, get) => ({
  theme: new Animated.Value(0),
  noAnimTheme: 0,
  getTheme: () => themeTable[get().noAnimTheme],
  toggleTheme: () => {
    if (!lock) {
      lock = true;
      setTimeout(() => {
        lock = false;
      }, 300);
      const theme = !!Number(JSON.stringify(get().theme));
      set({ noAnimTheme: +!get().noAnimTheme });
      Animated.timing(get().theme, {
        toValue: theme ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start(async () => {
        set({ theme: new Animated.Value(+!theme) });
        await setItem("theme", themeTable[get().noAnimTheme]);
      });
    }
  },
  color: (type, index, noAnim) => {
    if (noAnim) {
      const theme = themeTable[Number(JSON.stringify(get().noAnimTheme))];
      // noAnim이 true일 때는 상태 변경을 강제하지 않음
      if (type === "error" || type === "bg") {
        return colorTable[type][theme];
      } else {
        return colorTable[type][theme][index];
      }
    }

    if (type === "error" || type === "bg") {
      return get().theme.interpolate({
        inputRange: [0, 1],
        outputRange: [colorTable[type]["light"], colorTable[type]["dark"]],
      });
    } else {
      return get().theme.interpolate({
        inputRange: [0, 1],
        outputRange: [colorTable[type]["light"][index], colorTable[type]["dark"][index]],
      });
    }
  },
  load: async () => {
    const theme = await getItem("theme");
    if (theme === "dark") {
      set({ theme: new Animated.Value(1), noAnimTheme: 1 });
    } else {
      set({ theme: new Animated.Value(0), noAnimTheme: 0 });
    }
  },
}));
