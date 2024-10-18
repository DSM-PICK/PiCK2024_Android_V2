import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, StyleSheet, ViewProps } from "react-native";
import { View } from "./AnimatedComponents";
import { useColor } from "@/hooks";
import { Hidden } from "./Hidden";

interface IProp extends ViewProps {
  children: React.ReactElement | React.ReactElement[];
  Header?: React.ReactElement;
  bottomPad?: boolean;
}

export const Layout = ({ children, Header, bottomPad, ...props }: IProp) => {
  const { color } = useColor();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        props.style,
        {
          ...styles.container,
          paddingTop: top + (Platform.OS === "android" ? 10 : 10),
          paddingBottom: !!bottomPad ? bottom : 0,
          backgroundColor: color("bg"),
        },
      ]}
    >
      <Hidden data={Header}>{Header}</Hidden>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
  },
});
