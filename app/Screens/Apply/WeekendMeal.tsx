import { useMyMutation, useMyQuery, useTheme, useToast } from "@/hooks";
import { Button, Layout, PrevHedaer, Text, View } from "@/Components";
import { IWeekendMeal, weekendMealChangeStatusIn } from "@/apis";
import { StyleSheet } from "react-native";
import { getToday } from "@/utils";

export const WeekendMeal = () => {
  const { color } = useTheme();
  const { month } = getToday();
  const { success } = useToast();
  const { data: weekendMealData, refetch: weekendMealRefetch } = useMyQuery<IWeekendMeal>(
    "weekendMeal",
    "/my"
  );
  const { mutate: weekendMealMutate } = useMyMutation<weekendMealChangeStatusIn, null>(
    "patch",
    "weekendMeal",
    "/my-status?status="
  );

  const onSuccess = () => {
    weekendMealRefetch();
    success("성공적으로 변경되었습니다!");
  };

  return (
    <Layout
      Header={<PrevHedaer title="주말 급식 신청" />}
      style={{ alignItems: "flex-start", gap: 20 }}
    >
      <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
        주말 급식
      </Text>
      <Text colorType="gray" colorLevel={600} fontType="body" fontLevel={2}>
        신청 여부는 담임 선생님이 확인 후 영양사 선생님에게 전달돼요.
      </Text>
      <View
        style={{
          ...styles.barContainer,
          backgroundColor: color("gray", 50),
        }}
      >
        <Text colorType="gray" colorLevel={600} fontType="body" fontLevel={2}>
          {`${month + 1}월 주말 급식 신청`}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            type={weekendMealData?.status === "OK" ? "main" : "gray"}
            onPress={() => weekendMealMutate("OK", { onSuccess })}
            textProps={{ fontLevel: 2 }}
            style={styles.button}
          >
            신청
          </Button>
          <Button
            type={weekendMealData?.status === "NO" ? "main" : "gray"}
            onPress={() => weekendMealMutate("NO", { onSuccess })}
            textProps={{ fontLevel: 2 }}
            style={styles.button}
          >
            미신청
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
    overflow: "hidden",
    borderRadius: 8,
  },
  button: {
    height: 36,
    flexShrink: 1,
    borderRadius: 8,
    width: 70,
  },
});
