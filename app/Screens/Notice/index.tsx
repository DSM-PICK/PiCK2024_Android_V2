import { Layout, PrevHeader, View } from "@/Components";
import { FlatList, StyleSheet } from "react-native";
export { Detail as NoticeDetail } from "./Detail";
export { Item as NoticeItem } from "./Item";
import { noticeSimpleType } from "@/apis";
import { useMyQuery } from "@/hooks";
import { Item } from "./Item";
import { memo } from "react";

const today = new Date().toISOString().split("T")[0];

const MemoizedItem = memo(({ item }: { item: any }) => (
  <View style={{ padding: 24 }}>
    <Item id={item.id} title={item.title} showNew={item.create_at === today} date={item.create_at} />
  </View>
));

export const Notice = () => {
  const { data: noticeData } = useMyQuery<noticeSimpleType>("notice", "/simple");

  return (
    <Layout Header={<PrevHeader title="공지사항" />} style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={noticeData || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MemoizedItem item={item} />}
        // Add performance optimizations
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
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
