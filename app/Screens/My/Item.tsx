import { Text, View } from "@/Components";

interface IProp {
  title: string;
  data: string;
}

export const Item = ({ title, data }: IProp) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text colorType="gray" colorLevel={800} fontType="body" fontLevel={1}>
        {title}
      </Text>
      <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
        {data}
      </Text>
    </View>
  );
};
