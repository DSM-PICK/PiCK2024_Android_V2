import { useDebounce, useMyQuery, useTheme } from "@/hooks";
import { FlatList } from "react-native-gesture-handler";
import { timeTableWeekType } from "@/apis";
import { Text, View } from "@/Components";
import { useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";

const dayTable = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const windowWidth = Dimensions.get("window").width;

export const TimeTable = () => {
  const { data: timeTableData } = useMyQuery<timeTableWeekType>("timeTable", "/week");

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
        initialNumToRender={2}
        data={timeTableData}
        onScroll={handleScroll}
        horizontal
        disableIntervalMomentum={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        style={{ height: "85%" }}
        keyExtractor={(_, index) => index + ""}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text fontType="label" fontLevel={1} colorType="gray" colorLevel={900}>
              {dayTable[index]}
            </Text>
            <View style={{ gap: 8 }}>
              {item.timetables.map((i) => (
                <View style={styles.classContainer}>
                  <Text fontType="subTitle" fontLevel={2} colorType="normal" colorLevel="black">
                    <Text fontType="subTitle" fontLevel={2} colorType="main" colorLevel={500}>
                      {i.period + ""}
                    </Text>
                    교시
                  </Text>
                  <View style={styles.classTextContainer}>
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
      <View style={styles.indicatorContainer}>
        {Array.from({ length: 5 }).map((_, j) => (
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

const styles = StyleSheet.create({
  itemContainer: {
    width: windowWidth,
    gap: 20,
    paddingHorizontal: 24,
  },
  classContainer: {
    paddingVertical: 8,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  classTextContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
