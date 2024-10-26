import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Layout, PrevHedaer, Text, View } from "@/Components";
import { getDiff } from "@/utils";
import { useTheme } from "@/hooks";
import { Item } from "./Item";

const data = [
  {
    message: "testtest",
    create_at: "2024-10-24",
    read: false,
  },
  {
    message: "testtest",
    create_at: "2024-10-24",
    read: true,
  },
];

export const Alert = () => {
  const { color } = useTheme();

  return (
    <Layout Header={<PrevHedaer title="알림" />} style={{ paddingHorizontal: 0 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 24,
        }}
      >
        <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={2}>
          읽지 않은 알림 ({data.filter((i) => !i.read).length.toString()})
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <Text colorType="main" colorLevel={500} fontType="subTitle" fontLevel={2}>
            모두 읽음
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        style={{ width: "100%" }}
        renderItem={({ item }) => <Item {...item} />}
      />
    </Layout>
  );
};
