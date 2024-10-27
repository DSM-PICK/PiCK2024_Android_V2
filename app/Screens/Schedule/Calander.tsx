import { Calander as NativeCalander, Text, View } from "@/Components";
import { useMyQuery, useTheme } from "@/hooks";
import { getToday } from "@/utils";
import { useState } from "react";
import { monthTable } from "@/constants";
import { scheduleType } from "@/apis";
import { FlatList } from "react-native-gesture-handler";

const { year, month, fullDay } = getToday();

export const Calander = () => {
  const { color } = useTheme();
  const [date, setDate] = useState([year, month]);
  const [day, setDay] = useState(fullDay);
  const { data: scheduleData } = useMyQuery<scheduleType>(
    "schedule",
    `/month?year=${date[0]}&month=${monthTable[date[1] - 1]}`
  );

  const filteredItem = scheduleData?.filter(
    (i) =>
      `${date[0]}-${i.month.toString().padStart(2, "0")}-${i.day.toString().padStart(2, "0")}` ===
      day
  );

  return (
    <View style={{ paddingHorizontal: 24, gap: 24 }}>
      <NativeCalander
        onMonthChange={setDate}
        onSelect={setDay}
        selected={day}
        pointed={scheduleData?.map(
          (i) =>
            `${date[0]}-${date[1].toString().padStart(2, "0")}-${i.day.toString().padStart(2, "0")}`
        )}
      />
      <View style={{ gap: 12 }}>
        <Text colorType="normal" colorLevel="black" fontType="caption" fontLevel={1}>
          {day === fullDay && (
            <Text colorType="main" colorLevel={500} fontType="caption" fontLevel={1}>
              오늘{" "}
            </Text>
          )}
          {day.split("-")[1]}월 {day.split("-")[2]}일
        </Text>
        <Text colorType="gray" colorLevel={800} fontType="caption" fontLevel={2}>
          {filteredItem?.length ? `${filteredItem.length}개의 일정이 있습니다.` : "일정이 없습니다"}
        </Text>
      </View>
      <FlatList
        data={filteredItem}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              borderLeftColor: color("main", 500, true),
              borderLeftWidth: 3,
            }}
          >
            <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={2}>
              {item.event_name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
