import { Layout, PrevHedaer, Text, View, WeekCalander } from "@/Components";
import { StyleSheet } from "react-native";
import { selfStudyType } from "@/apis";
import { useMyQuery } from "@/hooks";
import { getToday } from "@/utils";
import { useState } from "react";
import { Item } from "./My";

const { fullDay } = getToday();

export const SelfStudy = () => {
  const [date, setDate] = useState(fullDay);
  const { data: selfStudyData } = useMyQuery<selfStudyType>("selfStudy", `/today?date=${date}`);

  return (
    <Layout
      Header={<PrevHedaer title="자습 감독 선생님 확인" />}
      Footer={
        <View style={{ position: "relative" }}>
          <WeekCalander onSelect={(e) => setDate(e)} selected={date} />
          <View style={{ width: "100%", height: 30, position: "absolute", bottom: -30, backgroundColor: "#FFFFFF" }} />
        </View>
      }
      style={{ paddingHorizontal: 0 }}
    >
      <View style={styles.contentContainer}>
        {date === fullDay ? (
          <Text colorType="normal" colorLevel="black" fontLevel={4} fontType="heading">
            {`${date.split("-")[1]}월 ${date.split("-")[2]}일,\n`}
            <Text colorType="main" colorLevel={500} fontLevel={4} fontType="heading">
              오늘의 자습 감독
            </Text>{" "}
            선생님입니다
          </Text>
        ) : (
          <Text colorType="main" colorLevel={500} fontLevel={4} fontType="heading">
            {`${date.split("-")[1]}월 ${date.split("-")[2]}일의\n`}
            <Text colorType="normal" colorLevel="black" fontLevel={4} fontType="heading">
              자습감독 선생님입니다
            </Text>
          </Text>
        )}
        {!!selfStudyData?.length ? (
          selfStudyData?.map(({ floor, teacher_name }) => <Item title={floor + "층"} data={teacher_name + " 선생님"} key={floor} />)
        ) : (
          <Text colorType="gray" colorLevel={500} fontLevel={1} fontType="body" style={{ alignSelf: "center" }}>
            등록된 자습 감독이 없습니다
          </Text>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 30,
    paddingHorizontal: 24,
    alignItems: "flex-start",
    width: "100%",
  },
});
