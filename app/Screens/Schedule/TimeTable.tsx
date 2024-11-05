import { timeTableWeekType } from "@/apis";
import { Text, View } from "@/Components";
import { useDebounce, useMyQuery, useTheme } from "@/hooks";
import { useState } from "react";
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const dayTable = ["월요일", "화요일", "수요일", "목요일", "금요일"];

export const TimeTable = () => {
  const { data: timeTableData } = useMyQuery<timeTableWeekType>("timeTable", "/week");
  const windowWidth = Dimensions.get("window").width;
  const { debounce } = useDebounce();
  const [page, setPage] = useState(0);
  const { color } = useTheme();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
    debounce(() => {
      setPage(index);
    }, 10);
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <FlatList
        initialNumToRender={1}
        data={timeTableData}
        onScroll={handleScroll}
        horizontal
        disableIntervalMomentum={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        style={{ height: "85%" }}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item, index }) => (
          <View style={{ width: windowWidth, gap: 20, paddingHorizontal: 24 }}>
            <Text fontType="label" fontLevel={1} colorType="gray" colorLevel={900}>
              {dayTable[index]}
            </Text>
            <View style={{ gap: 8 }}>
              {item.timetables.map((i) => (
                <View
                  style={{
                    paddingVertical: 8,
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <Text fontType="subTitle" fontLevel={2} colorType="normal" colorLevel="black">
                    <Text fontType="subTitle" fontLevel={2} colorType="main" colorLevel={500}>
                      {i.period + ""}
                    </Text>
                    교시
                  </Text>
                  <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <Image source={{ uri: i.image }} style={{ width: 28, height: 28 }} />
                    <Text fontType="label" fontLevel={1} colorType="normal" colorLevel="black">
                      {i.subject_name}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      />
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {Array.from({ length: 5 }).map((i, j) => (
          <View
            style={{
              width: page === j ? 15 : 5,
              height: 5,
              backgroundColor: page === j ? color("main", 500, true) : color("gray", 500, true),
              borderRadius: 10,
            }}
          />
        ))}
      </View>
    </View>
  );
};
