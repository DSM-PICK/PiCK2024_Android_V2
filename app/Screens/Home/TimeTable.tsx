import { LabelLayout, Text, View } from "@/Components";
import { timeTableTodayType } from "@/apis";
import { useMyQuery } from "@/hooks";
import { Image } from "react-native";

export const TimeTable = () => {
  const { data: timeTableData } = useMyQuery<timeTableTodayType>("timeTable", "/today");

  return (
    <LabelLayout label="오늘의 시간표" padding>
      {timeTableData?.timetables.map(({ period, subject_name, image }) => (
        <View style={{ flexDirection: "row", gap: 24, paddingVertical: 8, alignItems: "center" }}>
          <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={2}>
            <Text colorType="main" colorLevel={500} fontType="subTitle" fontLevel={2}>
              {period + ""}
            </Text>
            교시
          </Text>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <Image source={{ uri: image }} style={{ width: 28, height: 28 }} />
            <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
              {subject_name}
            </Text>
          </View>
        </View>
      ))}
    </LabelLayout>
  );
};
