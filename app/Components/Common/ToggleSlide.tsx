import { Animated, Dimensions, Pressable, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks";
import { View } from "./AnimatedComponents";
import { Text } from "./Text";

interface IProp {
  items: string[];
  onPress: (item: string) => void;
  padding?: number;
}
export const ToggleSlide = ({ items, onPress, padding }: IProp) => {
  const [selected, setSelected] = useState(0);
  const { color } = useTheme();
  const animation = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");
  const widthBySize: `${number}%` = `${100 / items.length}%`;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: Math.round(selected * ((width - (padding ? padding * 2 : 0)) / items.length)),
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [animation, selected]);

  const handlePress = (index: number, item: string) => {
    setSelected(index);
    onPress(item);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.barElement,
          {
            transform: [{ translateX: animation }],
            width: widthBySize,
            backgroundColor: color("main", 50, true),
          },
        ]}
      />

      <View style={styles.buttonContainer}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            style={[styles.buttonElement, { width: widthBySize }]}
            onPress={() => handlePress(index, item)}
          >
            <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
  },
  barElement: {
    height: "100%",
    borderRadius: 100,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    flexDirection: "row",
  },
  buttonElement: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
