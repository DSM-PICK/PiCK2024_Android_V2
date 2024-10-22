import { View, Text, Icon, TouchableOpacity, iconType } from "./Common";
import { Animated, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import { useTheme } from "@/hooks";

interface IProp {
  icon: iconType;
  title: string;
  content: string;
  buttonContent: string;
  onPressButton: () => void;
  disabled?: boolean;
}

export const SlideMenu = ({
  icon,
  title,
  content,
  buttonContent,
  onPressButton,
  disabled,
}: IProp) => {
  const height = useRef(0);
  const [opened, setOpened] = useState(false);
  const { color } = useTheme();

  const heightAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  const start = () => {
    Animated.timing(heightAnim, {
      toValue: opened ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => heightAnim.setValue(opened ? 0 : 1));
    Animated.timing(borderAnim, {
      toValue: opened ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => borderAnim.setValue(opened ? 0 : 1));
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
      onPress={() => {
        setOpened((prev) => !prev);
        start();
      }}
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
        <TouchableOpacity
          disabled={disabled}
          style={{
            ...styles.button,
            backgroundColor: disabled ? color("main", 100) : color("main", 500),
          }}
          onPress={onPressButton}
          activeOpacity={0.6}
        >
          <Text colorType="normal" colorLevel="white" fontType="button" fontLevel={1}>
            {buttonContent}
          </Text>
        </TouchableOpacity>
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
  button: {
    width: "100%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
