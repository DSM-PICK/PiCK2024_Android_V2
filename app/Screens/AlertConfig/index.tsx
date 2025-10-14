import { Layout, PrevHeader, Text, View } from "@/Components";
import { useTheme } from "@/hooks";
import { Item } from "./Item";
import { StyleSheet } from "react-native";

export const AlertConfig = () => {
  const { color } = useTheme();

  return (
    <Layout Header={<PrevHeader title="알림 설정" />} style={{ paddingHorizontal: 0 }}>
      <Item type="big" title="전체 알림" value={false} onPress={() => {}} />
      <View style={{ width: "100%", height: 8, backgroundColor: color("gray", 50) }} />
      <View style={styles.contentContainer}>
        <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
          맞춤 설정
        </Text>
        <Text colorType="gray" colorLevel={500} fontType="body" fontLevel={1}>
          원하시는 알림을 설정하면 원하는 알림만 보내드릴게요.
        </Text>
      </View>
      <Item type="small" title="외출 상태 변경" value={false} onPress={() => {}} />
      <Item type="small" title="교실 이동 상태 변경" value={false} onPress={() => {}} />
      <Item type="small" title="새로운 공지 등록" value={false} onPress={() => {}} />
      <Item type="small" title="주말 급식 신청 기간" value={false} onPress={() => {}} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 24,
  },
});
