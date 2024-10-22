import { StyleSheet } from "react-native";
import { View, Icon } from "../Common";
import { useTheme } from "@/hooks";
import { Logo } from "@/assets";

export const Header = () => {
  const { toggleTheme, getTheme } = useTheme();
  const { color } = useTheme();

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.iconContainer}>
        <Icon
          name={getTheme() === "dark" ? "Dark" : "Light"}
          colorType="normal"
          colorLevel="black"
          onPress={() => toggleTheme()}
        />
        <Icon name="Bell" colorType="gray" colorLevel={300} />
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
    paddingHorizontal: 24,
  },
  iconContainer: { flexDirection: "row", alignItems: "center", gap: 5 },
});
