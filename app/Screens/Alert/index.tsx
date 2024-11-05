import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Layout, PrevHedaer, Text, View } from "@/Components";
import { StyleSheet } from "react-native";
import { Item } from "./Item";

export const Alert = () => {
  return (
    <Layout Header={<PrevHedaer title="알림" />} style={{ paddingHorizontal: 0 }}>
      <View style={styles.contentContainer}>
        <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={2}>
          읽지 않은 알림 ({[].filter((i) => !i.read).length.toString()})
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <Text colorType="main" colorLevel={500} fontType="subTitle" fontLevel={2}>
            모두 읽음
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList data={[]} style={{ width: "100%" }} renderItem={({ item }) => <Item {...item} />} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
});
