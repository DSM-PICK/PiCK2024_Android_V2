import { LabelLayout, Text, View } from "@/Components";
import { useMyQuery, useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { getToday } from "@/utils";
import { IMeal } from "@/apis";

const nameTable = ["조식", "중식", "석식"];
const timeTable = [8, 13, 19];

export const Meal = () => {
  const { data: mealData } = useMyQuery<IMeal>("meal", `/date?date=${getToday().fullDay}`);
  const { color } = useTheme();
  const date = new Date();

  return (
    <LabelLayout label="오늘의 급식" onlyLabelPadding noGap>
      {mealData &&
        Object.values(mealData?.meal_list).map((item, index) => (
          <View
            key={index}
            style={{
              ...styles.itemContainer,
              backgroundColor:
                date.getHours() < timeTable[index] && date.getHours() > timeTable[index - 1]
                  ? color("main", 50)
                  : "transparent",
            }}
          >
            <Text colorType="main" colorLevel={700} fontType="subTitle" fontLevel={1}>
              {nameTable[index]}
            </Text>
            <Text
              colorType="normal"
              colorLevel="black"
              fontType="body"
              fontLevel={1}
              style={{ width: 116 }}
            >
              {!!item.menu.length ? item.menu.join("\n") : "급식이 없습니다"}
            </Text>
            {!!item.menu.length ? (
              <View
                style={{
                  ...styles.contentContainer,
                  backgroundColor: color("main", 500),
                }}
              >
                <Text colorType="normal" colorLevel="white" fontType="body" fontLevel={1}>
                  {!!item.menu.length ? item.cal : "0 Kcal"}
                </Text>
              </View>
            ) : (
              <View style={{ width: 100 }}></View>
            )}
          </View>
        ))}
    </LabelLayout>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  contentContainer: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 110,
    alignItems: "center",
  },
});
