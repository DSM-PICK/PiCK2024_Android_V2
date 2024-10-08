import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { HiddenView } from "../layout";
import { Eye, EyeOff } from "@/assets/icons";

export type changeEventType = {
  text: string;
  name: string;
};

interface InputProps {
  value?: string;
  placeholder?: string;
  onChange: ({ text, name }: changeEventType) => void;
  name?: string;
  error?: boolean;
  disabled?: boolean;
  password?: boolean;
  multiLine?: number;
  label?: string;
}

export default function Input({
  value,
  placeholder,
  onChange,
  name = "",
  error,
  disabled,
  password,
  multiLine,
  label,
}: InputProps) {
  const [active, setActive] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const { theme } = useThemeStore();
  return (
    <View style={{ gap: 12 }}>
      {label && (
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          style.container,
          {
            backgroundColor: theme.Gray[50],
            borderColor: active ? theme.Main[500] : theme.Gray[50],
            borderWidth: 1,
          },
        ]}
      >
        <TextInput
          style={[
            {
              color: theme.normal.black,
              width: password ? "92%" : "100%",
              textAlignVertical: multiLine ? "top" : "auto",
              paddingVertical: multiLine ? 4 : 0,
              paddingHorizontal: multiLine ? 8 : 0,
            },
          ]}
          editable={!disabled}
          secureTextEntry={password && !visible}
          value={value}
          onChangeText={(text) => onChange({ text, name })}
          placeholder={placeholder}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
          placeholderTextColor={theme.Gray[500]}
          selectionColor={theme.Main[500]}
          multiline={!!multiLine}
          numberOfLines={multiLine || 1}
        />
        <HiddenView data={password}>
          {visible ? (
            <Eye
              Fill={theme.normal.black}
              OnPress={() => setVisible(!visible)}
            />
          ) : (
            <EyeOff
              Fill={theme.normal.black}
              OnPress={() => setVisible(!visible)}
            />
          )}
        </HiddenView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: "100%",
    flexDirection: "row",
  },
});
