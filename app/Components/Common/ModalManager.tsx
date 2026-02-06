import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Animated, Easing, StyleSheet, Dimensions } from "react-native";
import { View } from "./AnimatedComponents";
import { useModal } from "@/hooks";

const ModalManagerComponent = () => {
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
  }, [bgValue, contentHeight, height, yValue]);

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
  }, [bgValue, height, set, yValue]);

  const animValue = bgValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#00000000", "#000000DD"],
  });

  useEffect(() => {
    if (isOpened) open();
    else if (component) close();
  }, [isOpened, contentHeight, open, close, component]);

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

export const ModalManager = memo(ModalManagerComponent);
