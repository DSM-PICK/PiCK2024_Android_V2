import { Layout, PrevHedaer, Text, View } from "@/Components";
import { FlatList, Image, StyleSheet } from "react-native";
export { Detail as NoticeDetail } from "./Detail";
import { useTheme, useMyQuery } from "@/hooks";
export { Item as NoticeItem } from "./Item";
import { noticeSimpleType } from "@/apis";
import { Item } from "./Item";

export const Notice = () => {
  const { color } = useTheme();
  const { data: noticeData } = useMyQuery<noticeSimpleType>("notice", "/simple");

  return (
    <Layout Header={<PrevHedaer title="공지사항" />} style={styles.container}>
      <View
        style={{
          ...styles.noticeContainer,
          backgroundColor: color("main", 50),
        }}
      >
        <View style={{ gap: 8 }}>
          <Text colorType="main" colorLevel={600} fontType="body" fontLevel={2}>
            NOTICE
          </Text>
          <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
            PiCK에서 알려드립니다!
          </Text>
          <Text colorType="gray" colorLevel={900} fontType="label" fontLevel={2}>
            모든 공지는 선생님께서 작성하십니다.
          </Text>
        </View>
        <Image source={require("@/assets/images/Notice.png")} style={styles.image} />
      </View>
      <FlatList
        style={styles.listContainer}
        data={noticeData}
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
  container: { paddingHorizontal: 0, gap: 24 },
  noticeContainer: {
    width: "100%",
    height: "auto",
    paddingVertical: 8,
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
