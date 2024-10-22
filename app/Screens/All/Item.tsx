import { Icon, iconType, Text, TouchableOpacity } from "@/Components";

interface IProp {
  icon: iconType;
  children: string;
  onPress: () => void;
}

export const Item = ({ icon, children, onPress }: IProp) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        paddingVertical: 6,
      }}
      activeOpacity={0.6}
    >
      <Icon
        name={icon}
        colorType={icon === "Exit" ? "error" : "main"}
        colorLevel={icon !== "Exit" ? 600 : null}
        size={34}
      />
      <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
