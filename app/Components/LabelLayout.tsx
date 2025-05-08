import { StyleSheet } from "react-native";
import { Text, View } from "./Common";

interface IProp {
  label: string;
  subLabel?: React.ReactElement;
  padding?: boolean;
  onlyLabelPadding?: boolean;
  noGap?: boolean;
  children: React.ReactElement | React.ReactElement[];
  required?: boolean;
  type?: "gray" | "black";
}

export const LabelLayout = ({ label, subLabel, padding, onlyLabelPadding, noGap, children, required, type = "gray" }: IProp) => {
  return (
    <View style={{ width: "100%", paddingHorizontal: padding ? 24 : 0, gap: noGap ? 0 : 12 }}>
      <View
        style={{
          ...styles.labelContainer,
          paddingHorizontal: onlyLabelPadding && !padding ? 24 : 0,
          marginBottom: noGap ? 12 : 0,
        }}
      >
        <Text colorType={type === "gray" ? "gray" : "normal"} colorLevel={type === "gray" ? 600 : "black"} fontType="label" fontLevel={1}>
          {label}
          {required && (
            <Text colorType="error" fontType="label" fontLevel={1}>
              *
            </Text>
          )}
        </Text>
        {subLabel}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});
