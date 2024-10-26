import { GestureResponderEvent, TouchableOpacityProps, StyleSheet } from "react-native";
import { TouchableOpacity } from "./AnimatedComponents";
import { ITextProp, Text } from "./Text";
import { useTheme } from "@/hooks";

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
  disabled,
  children,
  textProps,
  ...props
}: IProp) => {
  const { color } = useTheme();
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          ...styles.container,
          backgroundColor:
            type === "main"
              ? color("main", !!!disabled ? 500 : 100)
              : color("gray", !!!disabled ? 100 : 200),
          ...(props.style as object),
        },
      ]}
      disabled={disabled}
      onPress={onPress}
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
    borderRadius: 14,
    flexShrink: 1,
  },
});
