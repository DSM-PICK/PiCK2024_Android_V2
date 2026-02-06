import { Layout, PrevHeader, Text, View } from "@/Components";
import { useMyQuery, useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { INoticeDetail } from "@/apis";

export const Detail = ({ route }) => {
  const { id, title } = route.params;
  const { data: detailData } = useMyQuery<INoticeDetail>("notice", `/${id}`);
  const { color } = useTheme();

  return (
    <Layout
      Header={<PrevHeader title={title} />}
      style={styles.container}
      scrollAble
    >
      <View
        style={{
          ...styles.titleContainer,
          borderBottomColor: color("gray", 50),
        }}
      >
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="subTitle"
          fontLevel={1}
        >
          {detailData?.title}
        </Text>
        <View style={styles.titleInformContainer}>
          <Text colorType="gray" colorLevel={500} fontType="body" fontLevel={1}>
            {detailData?.create_at}
          </Text>
          <Text colorType="gray" colorLevel={500} fontType="body" fontLevel={1}>
            {detailData?.teacher} 선생님
          </Text>
        </View>
      </View>
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="body"
        fontLevel={1}
        style={{ paddingHorizontal: 24 }}
      >
        {detailData?.content}{" "}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    gap: 28,
    paddingHorizontal: 0,
  },
  titleContainer: {
    paddingHorizontal: 24,
    width: "100%",
    gap: 12,
    borderBottomWidth: 1,
    paddingBottom: 18,
  },
  titleInformContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
