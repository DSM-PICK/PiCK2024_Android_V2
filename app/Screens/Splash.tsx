import { Animated, Image } from "react-native";
import { View } from "@/Components";
import { useTheme } from "@/hooks";
import { useEffect } from "react";
import { delItem } from "@/utils";

interface IProp {
  fade: Animated.Value;
}

export const Splash = ({ fade }: IProp) => {
  const { color, getTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        opacity: fade,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: color("bg"),
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <Image
        style={{ width: 250, height: 250 }}
        source={
          getTheme() === "light"
            ? require("@/assets/images/SplashLight.gif")
            : require("@/assets/images/SplashDark.gif")
        }
      />
    </View>
  );
};
