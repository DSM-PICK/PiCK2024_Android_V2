import { useColor, useTheme } from "@/hooks";
import { Animated, Image } from "react-native";
import { View } from "@/Components";

interface IProp {
  fade: Animated.Value;
}

export const Splash = ({ fade }: IProp) => {
  const { color } = useColor();
  const { theme } = useTheme();

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
          theme === "light"
            ? require("@/assets/SplashLight.gif")
            : require("@/assets/SplashDark.gif")
        }
      />
    </View>
  );
};
