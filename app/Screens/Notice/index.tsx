import { Layout, PrevHedaer, View } from "@/Components";
import { FlatList, StyleSheet } from "react-native";
export { Detail as NoticeDetail } from "./Detail";
export { Item as NoticeItem } from "./Item";
import { noticeSimpleType } from "@/apis";
import { useMyQuery } from "@/hooks";
import { Item } from "./Item";

export const Notice = () => {
  const { data: noticeData } = useMyQuery<noticeSimpleType>("notice", "/simple");

  return (
    <Layout Header={<PrevHedaer title="공지사항" />} style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={noticeData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ padding: 24 }}>
            <Item id={item.id} title={item.title} showNew={!!!index} date={item.create_at} />
          </View>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, gap: 0 },
  noticeContainer: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    width: "100%",
    height: "100%",
  },
  image: { width: 100, height: 100 },
});
