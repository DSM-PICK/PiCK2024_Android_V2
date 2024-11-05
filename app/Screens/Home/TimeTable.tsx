import { LabelLayout, Text, View } from "@/Components";
import { Image, StyleSheet } from "react-native";
import { useMyQuery, useTheme } from "@/hooks";
import { timeTableTodayType } from "@/apis";

export const TimeTable = () => {
  const { data: timeTableData } = useMyQuery<timeTableTodayType>("timeTable", "/today");
  const { color } = useTheme();

  return !!timeTableData?.timetables.length ? (
    <LabelLayout label="오늘의 시간표" padding>
      {timeTableData?.timetables.map(({ period, subject_name, image }) => (
        <View style={styles.classContainer} key={period}>
          <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={2}>
            <Text colorType="main" colorLevel={500} fontType="subTitle" fontLevel={2}>
              {period + ""}
            </Text>
            교시
          </Text>
          <View style={styles.contentContainer}>
            <Image source={{ uri: image }} style={{ width: 28, height: 28 }} />
            <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
              {subject_name}
            </Text>
          </View>
        </View>
      ))}
    </LabelLayout>
  ) : (
    <View style={{ width: "100%", paddingHorizontal: 24 }}>
      <View style={{ ...styles.noTableContainer, backgroundColor: color("gray", 50) }}>
        <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
          오늘은 등록된 시간표가 없습니다
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noTableContainer: {
    width: "100%",
    paddingHorizontal: 35,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  classContainer: {
    flexDirection: "row",
    gap: 24,
    paddingVertical: 8,
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
