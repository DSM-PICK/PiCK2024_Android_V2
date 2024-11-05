import { Image, StyleSheet } from "react-native";
import { useMyQuery, useTheme } from "@/hooks";
import { Text, View } from "@/Components";
import { selfStudyType } from "@/apis";
import { getToday } from "@/utils";

export const SelfStudy = () => {
  const { data: teacherData } = useMyQuery<selfStudyType>(
    "selfStudy",
    `/today?date=${getToday().fullDay}`
  );

  const { color } = useTheme();

  return (
    <View style={{ width: "100%", paddingHorizontal: 24 }}>
      <View style={{ ...styles.contentContainer, backgroundColor: color("gray", 50) }}>
        <View style={{ gap: 12 }}>
          {!teacherData?.length ? (
            <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={2}>
              오늘은 자습감독 선생님이 없습니다.
            </Text>
          ) : (
            <>
              <Text colorType="gray" colorLevel={900} fontType="label" fontLevel={2}>
                오늘의 자습감독 선생님입니다
              </Text>

              {teacherData?.map((i) => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }} key={i.floor}>
                  <Text colorType="main" colorLevel={600} fontType="label" fontLevel={2}>
                    {i.floor + ""}층
                  </Text>
                  <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={3}>
                    {i.teacher_name} 선생님
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>
        <Image
          source={require("@/assets/images/Calander.png")}
          style={{ width: 125, height: 125 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 12,
  },
});
