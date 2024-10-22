import { GestureResponderEvent, TouchableOpacityProps, StyleSheet } from "react-native";
import { TouchableOpacity } from "./AnimatedComponents";
import { useTheme } from "@/hooks";
import { Text } from "./Text";

interface IProp extends TouchableOpacityProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  children: string;
}

export const Button = ({ onPress, disabled, children, ...props }: IProp) => {
  const { color } = useTheme();
  return (
    <TouchableOpacity
      {...props}
      style={[
        props.style,
        { ...styles.container, backgroundColor: color("main", !!!disabled ? 500 : 100) },
      ]}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text colorType="normal" colorLevel="white" fontType="button" fontLevel={1}>
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
  },
});
