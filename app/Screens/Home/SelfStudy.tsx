import { useMyQuery, useTheme } from "@/hooks";
import { Text, View } from "@/Components";
import { selfStudyType } from "@/apis";
import { Image } from "react-native";

export const SelfStudy = () => {
  const { data: teacherData } = useMyQuery<selfStudyType>("selfStudy", "/today?date=2024-09-10");
  const { color } = useTheme();

  return (
    <View
      style={{
        backgroundColor: color("gray", 50),
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        marginHorizontal: 24,
        width: "100%",
        justifyContent: "space-between",
        borderRadius: 12,
      }}
    >
      <View style={{ gap: 12 }}>
        {!teacherData?.length ? (
          <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={2}>
            오늘은 자습감독이 없습니다.
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
      <Image source={require("@/assets/images/Calander.png")} style={{ width: 125, height: 125 }} />
    </View>
  );
};
