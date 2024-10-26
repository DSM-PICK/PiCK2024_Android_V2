import { View as AnimView, NativeInput } from "./AnimatedComponents";
import { TextInputProps, View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks";
import { useState } from "react";
import { Icon } from "./Icon";
import { Text } from "./Text";

interface IProp extends Omit<TextInputProps, "onChange"> {
  value?: string;
  onChange: (text: string, id?: string) => void;
  placeholder: string;
  multiLine?: number;
  password?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  id?: string;
}

export const TextInput = ({
  value,
  onChange,
  placeholder,
  multiLine,
  password,
  disabled,
  required,
  error,
  label,
  id,
  ...props
}: IProp) => {
  const [visible, setVisible] = useState(false);
  const [focus, setFocus] = useState(false);
  const { color } = useTheme();
  const height = !!multiLine ? multiLine * 18.8 + 20 : 42.8;

  return (
    <View style={styles.container}>
      {label && (
        <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
          {label}
          {required && (
            <Text colorType="error" fontType="label" fontLevel={1}>
              *
            </Text>
          )}
        </Text>
      )}
      <AnimView
        style={{
          ...styles.inputContainer,
          height,
          backgroundColor: color("gray", 50),
          alignItems: !!multiLine ? "flex-start" : "center",
        }}
      >
        {(error || focus) && (
          <AnimView
            pointerEvents="none"
            style={{
              ...styles.border,
              height,
              borderColor: !!error ? color("error") : focus && color("main", 500),
            }}
          />
        )}
        <NativeInput
          {...props}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          secureTextEntry={!!password && !visible}
          value={value}
          onChangeText={(text) => onChange(text, id)}
          placeholder={placeholder}
          multiline={!!multiLine}
          numberOfLines={!!multiLine ? multiLine : 1}
          editable={!!!disabled}
          style={[props.style, styles.input, { color: color("normal", "black") }]}
          placeholderTextColor={color("gray", 400)}
        />
        {password && (
          <Icon
            name={visible ? "Eye" : "EyeOff"}
            size={24}
            colorType="gray"
            colorLevel={900}
            onPress={() => setVisible((prev) => !prev)}
          />
        )}
      </AnimView>
      {error && (
        <Text colorType="error" fontType="body" fontLevel={1} style={{ alignSelf: "flex-end" }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
  },
  border: {
    zIndex: 40,
    borderWidth: 1,
    top: 0,
    left: 0,
    width: "110%",
    borderRadius: 8,
    position: "absolute",
  },
  input: {
    verticalAlign: "top",
    fontSize: 14,
    fontFamily: "Regular",
    width: "100%",
    flexShrink: 1,
  },
});
