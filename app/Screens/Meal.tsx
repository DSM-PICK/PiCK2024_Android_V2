import { IMeal } from "@/apis";
import { Header, Layout, Text, View, WeekCalander } from "@/Components";
import { useMyQuery, useTheme } from "@/hooks";
import { getToday } from "@/utils";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const { fullDay } = getToday();
const nameTable = ["조식", "중식", "석식"];

export const Meal = ({ navigation }) => {
  const [date, setDate] = useState(fullDay);
  const { data: mealData } = useMyQuery<IMeal>("meal", `/date?date=${date}`);
  const { color } = useTheme();

  return (
    <Layout
      Header={<Header navigation={navigation} />}
      Footer={<WeekCalander onSelect={setDate} selected={date} />}
      style={{ paddingHorizontal: 0, alignItems: "flex-start", gap: 0 }}
    >
      <View style={{ gap: 24 }}>
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="heading"
          fontLevel={4}
          style={{ paddingHorizontal: 24, marginTop: 12 }}
        >
          {date === fullDay && (
            <Text colorType="main" colorLevel={500} fontType="heading" fontLevel={4}>
              오늘{" "}
            </Text>
          )}
          {date.split("-")[1]}월 {date.split("-")[2]}일
        </Text>
        <FlatList
          data={mealData ? Object.values(mealData?.meal_list) : []}
          contentContainerStyle={{ gap: 20, width: "100%" }}
          style={{ paddingHorizontal: 24 }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: color("main", 50, true),
                width: "100%",
                alignSelf: "center",
                gap: 50,
                paddingHorizontal: 40,
                paddingVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ gap: 10, alignItems: "center" }}>
                <Text colorType="main" colorLevel={700} fontType="subTitle" fontLevel={1}>
                  {nameTable[index]}
                </Text>
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
              </View>
              <Text
                colorType="normal"
                colorLevel="black"
                fontType="body"
                fontLevel={1}
                style={{ width: 116 }}
              >
                {!!item.menu.length ? item.menu.join("\n") : "메뉴가 없습니다"}
              </Text>
            </View>
          )}
        />
      </View>
    </Layout>
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
    width: 100,
    alignItems: "center",
  },
});
