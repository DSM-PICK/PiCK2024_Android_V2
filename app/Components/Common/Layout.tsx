import { Platform, ScrollViewProps, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, ScrollView } from "./AnimatedComponents";
import { useTheme } from "@/hooks";

interface IProp extends ScrollViewProps {
  children: React.ReactElement | React.ReactElement[];
  Header?: React.ReactElement;
  Footer?: React.ReactElement;
  bottomPad?: boolean;
  scrollAble?: boolean;
}

export const Layout = ({
  children,
  Header,
  Footer,
  bottomPad,
  scrollAble,
  ...props
}: IProp) => {
  const { top, bottom } = useSafeAreaInsets();
  const { color } = useTheme();

  return (
    <>
      <View
        style={{
          height: top,
          width: "100%",
          backgroundColor: color("bg"),
        }}
      />
      {scrollAble ? (
        <View
          style={{
            flex: 1,
            paddingBottom: !!!bottomPad ? bottom : 0,
            backgroundColor: color("bg"),
          }}
        >
          <View style={{ width: "100%", zIndex: 200 }}>{Header}</View>
          <ScrollView>
            <View {...props} style={[styles.childrenContainer, props.style]}>
              {children}
            </View>
          </ScrollView>
          {Footer}
        </View>
      ) : (
        <View
          {...props}
          style={{
            ...styles.container,
            paddingBottom: !!!bottomPad ? bottom : 0,
            backgroundColor: color("bg"),
            ...(props.style as object),
          }}
        >
          <View style={{ width: "100%", zIndex: 200 }}>{Header}</View>
          <View style={[styles.childrenContainer, props.style, { zIndex: 10 }]}>
            {children}
          </View>
          {Footer}
        </View>
      )}
      {!!bottomPad && (
        <View
          style={{
            ...styles.bottomPad,
            height: (Platform.OS === "ios" ? 50 : 60) + bottom,
            backgroundColor: color("bg"),
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    alignItems: "center",
  },
  childrenContainer: {
    position: "relative",
    width: "100%",
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    flexShrink: 1,
    gap: 32,
    paddingVertical: 24,
  },
  bottomPad: {
    bottom: 0,
    width: "100%",
    zIndex: 10,
    flexShrink: 0,
  },
});
