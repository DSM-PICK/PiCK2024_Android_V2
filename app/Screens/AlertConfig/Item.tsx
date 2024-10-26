import { Text, Toggle, View } from "@/Components";

interface IProp {
  type: "big" | "small";
  title: string;
  value: boolean;
  onPress: () => void;
}

export const Item = ({ type, title, value, onPress }: IProp) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
      }}
    >
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="subTitle"
        fontLevel={type === "big" ? 1 : 2}
      >
        {title}
      </Text>
      <Toggle value={value} onPress={onPress} />
    </View>
  );
};
