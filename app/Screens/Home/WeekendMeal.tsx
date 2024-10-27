import { Icon, Text, View } from "@/Components";
import { useMyQuery, useTheme } from "@/hooks";
import { IWeekendMealPeriod } from "@/apis";
import { StyleSheet } from "react-native";
import { getToday } from "@/utils";

const { date, month } = getToday();
export const WeekendMeal = () => {
  const { color } = useTheme();
  const { data: weekendMealDateData } = useMyQuery<IWeekendMealPeriod>("weekendMeal", "/period");
  const canApply =
    (weekendMealDateData?.start || 1 < date) && (weekendMealDateData?.end || 7 > date);

  return (
    canApply && (
      <View style={{ width: "100%", paddingHorizontal: 24 }}>
        <View
          style={{
            ...styles.barContainer,
            backgroundColor: color("main", 50),
          }}
        >
          <Icon name="Notice" colorType="normal" colorLevel="black" size={27} />
          <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={2}>
            지금은{" "}
            <Text colorType="main" colorLevel={900} fontType="label" fontLevel={2}>
              주말 급식 신청 기간
            </Text>
            입니다 ({month + ""}월 {weekendMealDateData?.start || 1 + ""}일 ~ {month + ""}월{" "}
            {weekendMealDateData?.end || 7 + ""}일)
          </Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    borderRadius: 100,

    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
