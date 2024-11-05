import { View, Text, Icon, TouchableOpacity, iconType, Button } from "./Common";
import { Animated, Easing, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks";

interface IProp {
  icon: iconType;
  title: string;
  content: string;
  id: string;
  buttonContent: string;
  onPressButton: () => void;
}

export const SlideMenu = ({ icon, title, content, id, buttonContent, onPressButton }: IProp) => {
  const height = useRef(0);
  const [open, setOpen] = useState(false);
  const { color } = useTheme();

  const heightAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    start();
  }, [open]);
  const start = () => {
    Animated.timing(heightAnim, {
      toValue: open ? 1 : 0,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start(() => heightAnim.setValue(open ? 1 : 0));
    Animated.timing(borderAnim, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => borderAnim.setValue(open ? 1 : 0));
  };

  const heightValue = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 60 + height.current],
  });
  const borderValue = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [color("gray", 50, true), color("main", 500, true)],
  });

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        height: heightValue,
        borderColor: borderValue,
      }}
      activeOpacity={1}
      onPress={() => setOpen((prev) => !prev)}
    >
      <View style={styles.titleContainer}>
        <Icon name={icon} size={34} colorType="gray" colorLevel={800} />
        <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
          {title}
        </Text>
      </View>
      <View
        style={styles.contentContainer}
        onLayout={(event) => (height.current = event.nativeEvent.layout.height)}
      >
        <Text colorType="gray" colorLevel={800} fontType="body" fontLevel={2}>
          {content.replace(/\\n/g, "\n")}
        </Text>
        <Button
          style={{ height: 36, borderRadius: 8 }}
          onPress={() => {
            setOpen(false);
            onPressButton();
          }}
        >
          {buttonContent}
        </Button>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    height: 60,
    padding: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
});
