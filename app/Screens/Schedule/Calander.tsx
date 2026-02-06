import { Calander as NativeCalander, Text, View } from "@/Components";
import { FlatList, StyleSheet } from "react-native";
import { useMyQuery, useTheme } from "@/hooks";
import { monthTable } from "@/constants";
import { scheduleType } from "@/apis";
import { getToday } from "@/utils";
import { useState, memo } from "react";

const { year, month, fullDay } = getToday();

const EventItem = memo(function Item({
  item,
  color,
}: {
  item: any;
  color: any;
}) {
  return (
    <View
      style={{ ...styles.event, borderLeftColor: color("main", 500, true) }}
    >
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="subTitle"
        fontLevel={2}
      >
        {item.event_name}
      </Text>
    </View>
  );
});

export const Calander = () => {
  const { color } = useTheme();
  const [date, setDate] = useState([year, month]);
  const [day, setDay] = useState(fullDay);
  const { data: scheduleData } = useMyQuery<scheduleType>(
    "schedule",
    `/month?year=${date[0]}&month=${monthTable[date[1] - 1]}`,
  );

  const filteredItem = scheduleData?.filter(
    (i) =>
      `${date[0]}-${i.month.toString().padStart(2, "0")}-${i.day.toString().padStart(2, "0")}` ===
      day,
  );

  return (
    <View style={{ paddingHorizontal: 24, gap: 24 }}>
      <NativeCalander
        onMonthChange={setDate}
        onSelect={setDay}
        selected={day}
        pointed={scheduleData?.map(
          (i) =>
            `${date[0]}-${date[1].toString().padStart(2, "0")}-${i.day.toString().padStart(2, "0")}`,
        )}
      />
      <View style={{ gap: 12 }}>
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="caption"
          fontLevel={1}
        >
          {day === fullDay && (
            <Text
              colorType="main"
              colorLevel={500}
              fontType="caption"
              fontLevel={1}
            >
              오늘{" "}
            </Text>
          )}
          {day.split("-")[1]}월 {day.split("-")[2]}일
        </Text>
        {!filteredItem?.length && (
          <View
            style={{
              width: "100%",
              height: "40%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Text
              colorType="gray"
              colorLevel={800}
              fontType="caption"
              fontLevel={2}
            >
              일정이 없습니다
            </Text>
          </View>
        )}
      </View>
      <View style={{ height: "25%" }}>
        <FlatList
          data={filteredItem || []}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => <EventItem item={item} color={color} />}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={3}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderLeftWidth: 3,
  },
});
