import { View, TouchableWithoutFeedback } from "./AnimatedComponents";
import { Animated, Easing, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks";

interface IProp {
  value: boolean;
  onPress: () => void;
}

export const Toggle = ({ value, onPress }: IProp) => {
  const { color } = useTheme();
  const moveValue = useRef(new Animated.Value(0)).current;
  const bgValue = useRef(new Animated.Value(0)).current;

  const anim = () =>
    Animated.parallel([
      Animated.timing(moveValue, {
        toValue: value === false ? 0 : 28,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(bgValue, {
        toValue: value === false ? 0 : 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => bgValue.setValue(value === false ? 0 : 1));

  const bgInter = bgValue.interpolate({
    inputRange: [0, 1],
    outputRange: [color("gray", 100, true), color("main", 500, true)],
  });

  useEffect(() => anim(), [value]);

  return (
    <TouchableWithoutFeedback
      style={{ ...styles.container, backgroundColor: bgInter }}
      onPress={onPress}
    >
      <View
        style={{
          ...styles.item,
          backgroundColor: color("bg"),
          transform: [{ translateX: moveValue }],
        }}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 32,
    borderRadius: 100,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  item: {
    width: 25,
    height: 25,
    borderRadius: 1000,
  },
});
