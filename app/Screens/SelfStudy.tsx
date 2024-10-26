import { Layout, PrevHedaer, Text, View } from "@/Components";
import { useMyQuery } from "@/hooks";
import { getToday } from "@/utils";
import { useEffect, useState } from "react";
import { Item } from "./My/Item";
import { selfStudyType } from "@/apis";

const fullDay = getToday().fullDay.split("-").map(Number);

export const SelfStudy = () => {
  const [date, setDate] = useState([2024, 9, 10]);
  const { data: selfStudyData } = useMyQuery<selfStudyType>(
    "selfStudy",
    `/today?date=${date.map((i) => i.toString().padStart(2, "0")).join("-")}`
  );

  useEffect(() => {
    setDate(fullDay);
  }, []);

  return (
    <Layout Header={<PrevHedaer title="자습 감독 선생님 확인" />} style={{ paddingHorizontal: 0 }}>
      <View style={{ gap: 30, paddingHorizontal: 24, alignItems: "flex-start", width: "100%" }}>
        <Text colorType="normal" colorLevel="black" fontLevel={4} fontType="heading">
          <Text colorType="main" colorLevel={500} fontLevel={4} fontType="heading">
            {date === fullDay ? `오늘` : `${date[1]}월 ${date[2]}일`}
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
