import { colorTable } from "@/constants";
import { getItem, setItem } from "@/utils";
import { Animated } from "react-native";
import { create } from "zustand";

interface ITheme {
  themeAnimValue: Animated.Value;
  currentTheme: 0 | 1;
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
  themeAnimValue: new Animated.Value(0),
  currentTheme: 0 as 0,
  getTheme: () => themeTable[get().currentTheme],
  toggleTheme: () => {
    if (!lock) {
      lock = true;
      setTimeout(() => {
        lock = false;
      }, 300);
      
      const currentTheme = get().currentTheme;
      const targetTheme = currentTheme === 0 ? 1 : 0;

      Animated.timing(get().themeAnimValue, {
        toValue: targetTheme,
        duration: 300,
        useNativeDriver: false,
      }).start(async () => {
        await setItem("theme", themeTable[targetTheme]);
        set({ currentTheme: targetTheme });
      });
    }
  },
  color: (type, index, noAnim) => {
    const color = (() => {
      if (noAnim) {
        const theme = themeTable[get().currentTheme];
        // noAnim이 true일 때는 상태 변경을 강제하지 않음
        if (type === "error" || type === "bg") {
          return colorTable[type][theme];
        } else {
          return colorTable[type][theme][index];
        }
      }
  
      if (type === "error" || type === "bg") {
        return get().themeAnimValue.interpolate({
          inputRange: [0, 1],
          outputRange: [colorTable[type]["light"], colorTable[type]["dark"]],
        });
      } else {
        return get().themeAnimValue.interpolate({
          inputRange: [0, 1],
          outputRange: [colorTable[type]["light"][index], colorTable[type]["dark"][index]],
        });
      }
    })();
    return JSON.stringify(color).replaceAll(`"`, "");
  },
  load: async () => {
    const theme = await getItem("theme");
    const themeIndex = theme === "dark" ? 1 : 0;
    get().themeAnimValue.setValue(themeIndex);
    set({ currentTheme: themeIndex });
  },
}));
