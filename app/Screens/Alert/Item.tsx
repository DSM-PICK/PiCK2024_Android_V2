import { Text, View } from "@/Components";
import { useTheme } from "@/hooks";
import { getDiff } from "@/utils";

interface IProp {
  message: string;
  create_at: string;
  read: boolean;
}

export const Item = ({ message, create_at, read }: IProp) => {
  const { color } = useTheme();

  return (
    <View
      style={{
        width: "100%",
        padding: 2,
        alignItems: "flex-start",
        paddingHorizontal: 24,
        backgroundColor: read ? color("bg") : color("main", 50),
        paddingVertical: 16,
        gap: 10,
      }}
    >
      <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
        {message}
      </Text>
      <Text colorType="gray" colorLevel={800} fontType="body" fontLevel={2}>
        {getDiff(create_at)}
      </Text>
    </View>
  );
};
