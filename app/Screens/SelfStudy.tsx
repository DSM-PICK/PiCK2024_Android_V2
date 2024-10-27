import { Layout, PrevHedaer, Text, View, WeekCalander } from "@/Components";
import { useMyQuery } from "@/hooks";
import { getToday } from "@/utils";
import { useState } from "react";
import { Item } from "./My/Item";
import { selfStudyType } from "@/apis";

const { fullDay } = getToday();

export const SelfStudy = () => {
  const [date, setDate] = useState(fullDay);
  const { data: selfStudyData } = useMyQuery<selfStudyType>("selfStudy", `/today?date=${date}`);

  return (
    <Layout
      Header={<PrevHedaer title="자습 감독 선생님 확인" />}
      Footer={<WeekCalander onSelect={(e) => setDate(e)} selected={date} />}
      style={{ paddingHorizontal: 0 }}
    >
      <View
        style={{
          gap: 30,
          paddingHorizontal: 24,
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Text colorType="normal" colorLevel="black" fontLevel={4} fontType="heading">
          <Text colorType="main" colorLevel={500} fontLevel={4} fontType="heading">
            {date === fullDay ? `오늘` : `${date.split("-")[1]}월 ${date.split("-")[2]}일`}
          </Text>
          의 자습 감독 선생님입니다.
        </Text>
        {!!selfStudyData?.length ? (
          selfStudyData?.map(({ floor, teacher_name }) => (
            <Item title={floor + "층"} data={teacher_name + " 선생님"} key={floor} />
          ))
        ) : (
          <Text
            colorType="gray"
            colorLevel={500}
            fontLevel={1}
            fontType="body"
            style={{ alignSelf: "center" }}
          >
            자습 감독이 없습니다
          </Text>
        )}
      </View>
    </Layout>
  );
};
