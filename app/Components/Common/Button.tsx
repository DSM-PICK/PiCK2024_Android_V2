import {
  GestureResponderEvent,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "./AnimatedComponents";
import { ITextProp, Text } from "./Text";
import { useTheme } from "@/hooks";
import { useState, useCallback } from "react";

interface IProp extends TouchableOpacityProps {
  onPress: (event: GestureResponderEvent) => void;
  type?: "main" | "gray";
  disabled?: boolean;
  textProps?: ITextProp;
  children: string;
}

export const Button = ({
  onPress,
  type = "main",
  disabled = false,
  children,
  textProps,
  ...props
}: IProp) => {
  const { color } = useTheme();
  const [internalDisabled, setInternalDisabled] = useState(false);

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (internalDisabled) return;

      setInternalDisabled(true);
      onPress(e);

      setTimeout(() => {
        setInternalDisabled(false);
      }, 3000);
    },
    [internalDisabled, onPress],
  );

  const isDisabled = disabled || internalDisabled;

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          ...styles.container,
          backgroundColor:
            type === "main"
              ? color("main", !isDisabled ? 500 : 100)
              : color("gray", !isDisabled ? 100 : 200),
          ...(props.style as object),
        },
      ]}
      disabled={isDisabled}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <Text
        colorType={type === "main" ? "normal" : "gray"}
        colorLevel={type === "main" ? "white" : 600}
        fontType="button"
        fontLevel={1}
        {...textProps}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 47,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexShrink: 1,
  },
});
