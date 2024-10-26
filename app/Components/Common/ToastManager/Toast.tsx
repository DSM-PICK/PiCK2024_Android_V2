import { ActivityIndicator, Animated, StyleSheet } from "react-native";
import { typeType, useToast, useTheme } from "@/hooks";
import { useEffect, useRef } from "react";
import { Text } from "../Text";
import { Icon } from "../Icon";

const typeTable: Record<typeType, React.ReactElement> = {
  success: <Icon name="ToastCheck" colorType="main" colorLevel={500} size={20} />,
  error: <Icon name="ToastX" colorType="error" size={20} />,
  wait: <ActivityIndicator size={20} />,
};

interface IProp {
  id: string;
  type: typeType;
  message: string;
  wasWait?: boolean;
}

export const Toast = ({ id, type, message, wasWait }: IProp) => {
  const pos = useRef(new Animated.Value(wasWait ? -80 : 100, { useNativeDriver: false })).current;
  const { color } = useTheme();
  const { close } = useToast();

  let timer: any;

  const debounce = (action: () => void, delay: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action();
    }, delay);
  };

  useEffect(() => (wasWait ? debounce(hideT, 1000) : showT()), []);

  const showT = () => {
    Animated.timing(pos, {
      toValue: -80,
      duration: 200,
      useNativeDriver: false,
    }).start(() => type !== "wait" && debounce(hideT, 1000));
  };

  const hideT = () => {
    Animated.timing(pos, {
      toValue: 100,
      duration: 400,
      useNativeDriver: false,
    }).start(() => close(id));
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          {
            translateY: pos,
          },
        ],
        backgroundColor: color("gray", 50),
      }}
    >
      {typeTable[type]}
      <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderRadius: 50,
    padding: 12,
    position: "absolute",
    bottom: 1,
    zIndex: 100,
    alignSelf: "center",
    elevation: 0.5,
  },
});
