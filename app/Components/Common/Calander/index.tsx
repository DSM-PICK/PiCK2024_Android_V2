import { days, getDates, getToday } from "@/utils";
import { View } from "../AnimatedComponents";
import { Text } from "../Text";
import { useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Icon } from "../Icon";
export * from "./WeekCalander";

// 코드 갈아엎기가 시급하다..

export interface IProp {
  selected?: string;
  pointed?: string[];
  weekOnly?: boolean;
  onSelect?: (event: string) => void;
  onMonthChange?: (event: number[]) => void;
}

const { fullDay, year, month, date: todate, dayNum } = getToday();

export const Calander = ({ selected, pointed, weekOnly, onSelect, onMonthChange }: IProp) => {
  const { color } = useTheme();
  const [date, setDate] = useState([year, month]);
  const { startDay, endDate } = getDates(date);
  const startWeekDays = 7 - startDay;
  const onlyWeekLength = todate < startWeekDays ? startWeekDays : todate - dayNum + 6;
  const onlyWeekStart = todate - dayNum;
  let onlyWeekEnd = todate - dayNum + 6;
  if (onlyWeekEnd > endDate) onlyWeekEnd -= startDay;

  const handleChangeDate = (direction: "left" | "right") => {
    if (direction === "left") {
      if (date[1] === 1) {
        setDate((prev) => [prev[0] - 1, 12]);
        onMonthChange && onMonthChange([date[0] - 1, 12]);
      } else {
        setDate((prev) => [prev[0], prev[1] - 1]);
        onMonthChange && onMonthChange([date[0], date[1] - 1]);
      }
    } else {
      if (date[1] === 12) {
        setDate((prev) => [prev[0] + 1, 1]);
        onMonthChange && onMonthChange([date[0] + 1, 1]);
      } else {
        setDate((prev) => [prev[0], prev[1] + 1]);
        onMonthChange && onMonthChange([date[0], date[1] + 1]);
      }
    }
  };

  return (
    <View style={{ width: "100%", gap: 20, alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {!weekOnly && (
          <Icon
            name="Arrrow"
            rotate="left"
            size={20}
            colorType="normal"
            colorLevel="black"
            onPress={() => handleChangeDate("left")}
          />
        )}
        <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
          {`${date[0]}년 ${date[1]}월`}
        </Text>
        {!weekOnly && (
          <Icon
            name="Arrrow"
            rotate="right"
            size={20}
            colorType="normal"
            colorLevel="black"
            onPress={() => handleChangeDate("right")}
          />
        )}
      </View>
      <View
        style={{
          ...styles.weekContainer,
          borderBottomColor: color("gray", 50, true),
          borderBottomWidth: 1,
        }}
      >
        {days.map((i) => (
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={weekOnly ? 2 : 1}
            style={styles.day}
          >
            {i}
          </Text>
        ))}
      </View>

      {weekOnly ? (
        <View style={styles.weekContainer}>
          {onlyWeekLength < 7 &&
            Array.from({ length: 7 - onlyWeekLength }).map(() => <View style={styles.day} />)}
          {Array.from({ length: onlyWeekLength }).map((_, index) => {
            if (index + 1 >= onlyWeekStart) {
              if (index + 1 > onlyWeekEnd) return <View style={styles.day} />;
              const formedDate = `${date[0]}-${date[1].toString().padStart(2, "0")}-${(index + 1)
                .toString()
                .padStart(2, "0")}`;

              return (
                <Text
                  colorType="normal"
                  colorLevel="black"
                  fontType="caption"
                  fontLevel={1}
                  style={{
                    ...styles.day,
                    backgroundColor:
                      formedDate === fullDay ? color("main", 100, true) : "transparent",
                    borderWidth: selected === formedDate ? 1 : 0,
                    borderColor: color("main", 100, true),
                  }}
                  onPress={() => onSelect(formedDate)}
                >
                  {`${index + 1}`}
                </Text>
              );
            }
          })}
        </View>
      ) : (
        Array.from({ length: Math.ceil((endDate + startDay) / 7) }).map((_, index) => {
          if (index == 0) {
            return (
              <View style={styles.weekContainer}>
                {Array.from({ length: startDay }).map(() => (
                  <View style={styles.day} />
                ))}
                {Array.from({ length: 7 - startDay }).map((_, innerIndex) => {
                  const formedDate = `${date[0]}-${date[1].toString().padStart(2, "0")}-${(
                    innerIndex + 1
                  )
                    .toString()
                    .padStart(2, "0")}`;
                  return (
                    <View style={{ position: "relative" }}>
                      <Text
                        colorType="normal"
                        colorLevel="black"
                        fontType="caption"
                        fontLevel={1}
                        style={{
                          ...styles.day,
                          backgroundColor:
                            formedDate === fullDay ? color("main", 100, true) : "transparent",
                          borderWidth: selected === formedDate ? 1 : 0,
                          borderColor: color("main", 100, true),
                          position: "relative",
                        }}
                        onPress={() => onSelect(formedDate)}
                      >
                        {`${innerIndex + 1}`}
                      </Text>
                      {pointed?.includes(formedDate) && (
                        <View
                          style={{
                            position: "absolute",
                            width: 5,
                            height: 5,
                            borderRadius: 100,
                            bottom: 0,
                            alignSelf: "center",
                            backgroundColor: color("main", 500, true),
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            );
          } else {
            return (
              <View style={styles.weekContainer}>
                {Array.from({ length: 7 }).map((_, innerIndex) => {
                  const realIndex = (index - 1) * 7 + (7 - startDay) + (innerIndex + 1);
                  const formedDate = `${date[0]}-${date[1].toString().padStart(2, "0")}-${realIndex
                    .toString()
                    .padStart(2, "0")}`;

                  if (realIndex > endDate) {
                    return <View style={styles.day} />;
                  }

                  return (
                    <View style={{ position: "relative" }}>
                      <Text
                        colorType="normal"
                        colorLevel="black"
                        fontType="caption"
                        fontLevel={1}
                        style={{
                          ...styles.day,
                          backgroundColor:
                            formedDate === fullDay ? color("main", 100, true) : "transparent",
                          borderWidth: selected === formedDate ? 1 : 0,
                          borderColor: color("main", 100, true),
                          position: "relative",
                        }}
                        onPress={() => onSelect(formedDate)}
                      >
                        {`${realIndex}`}
                      </Text>
                      {pointed?.includes(formedDate) && (
                        <View
                          style={{
                            position: "absolute",
                            width: 5,
                            height: 5,
                            borderRadius: 100,
                            bottom: 0,
                            alignSelf: "center",
                            backgroundColor: color("main", 500, true),
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            );
          }
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: "row",
    width: "100%",
    height: 36,
    justifyContent: "space-between",
  },
  day: {
    width: 28,
    height: 28,
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: 100,
    position: "relative",
  },
});
