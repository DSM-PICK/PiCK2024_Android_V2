import { Animated, Image, StyleSheet } from "react-native";
import { View } from "@/Components";
import { useTheme } from "@/hooks";

interface IProp {
  fade: Animated.Value;
}

export const Splash = ({ fade }: IProp) => {
  const { color, getTheme } = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        opacity: fade,
        backgroundColor: color("bg", null, true),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
});
