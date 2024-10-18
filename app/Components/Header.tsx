import { useColor, useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { View, Icon } from "./Common";
import { Logo } from "@/assets";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { color } = useColor();

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.iconContainer}>
        <Icon
          name={theme === "dark" ? "Dark" : "Light"}
          color={color("normal", "black", true)}
          onPress={() => toggleTheme()}
        />
        <Icon name="Bell" color={color("gray", 300, true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: { flexDirection: "row", alignItems: "center", gap: 5 },
});
