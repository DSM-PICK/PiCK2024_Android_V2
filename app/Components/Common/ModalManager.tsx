import { useEffect, useRef, useState, useCallback } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { View } from "./AnimatedComponents";
import { Dimensions } from "react-native";
import { useModal } from "@/hooks";

export const ModalManager = () => {
  const { isOpened, component, set } = useModal();
  const { height } = Dimensions.get("screen");

  const bgValue = useRef(new Animated.Value(0)).current;
  const yValue = useRef(new Animated.Value(height)).current;

  const [contentHeight, setContentHeight] = useState(0);

  const open = useCallback(() => {
    Animated.parallel([
      Animated.timing(bgValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(yValue, {
        toValue: height / 2 - contentHeight,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, [contentHeight, height]);

  const close = useCallback(() => {
    Animated.parallel([
      Animated.timing(bgValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(yValue, {
        toValue: height,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      set({ component: undefined });
    });
  }, [height]);

  const animValue = bgValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#00000000", "#000000DD"],
  });

  useEffect(() => {
    if (isOpened) open();
    else if (component) close();
  }, [isOpened, contentHeight, open, close]);

  return (
    <View
      style={{ ...styles.container, backgroundColor: animValue }}
      pointerEvents={isOpened ? "auto" : "none"}
    >
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height / 2)}
        style={{
          width: "100%",
          alignItems: "center",
          transform: [{ translateY: yValue }],
        }}
      >
        {component}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 20,
    top: 0,
    bottom: 0,
    alignItems: "center",
  },
});
