import { getDates, getToday } from "@/utils";
import { daysTable } from "@/constants";
import { View } from "../AnimatedComponents";
import { Text } from "../Text";
import { useBottomSheet, useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Icon } from "../Icon";

export interface IProp {
  selected?: string;
  pointed?: string[];
  weekOnly?: boolean;
  onSelect?: (event: string) => void;
  onMonthChange?: (event: number[]) => void;
}

const { fullDay, year, month, date: todate, dayNum } = getToday();

export const Calander = ({
  selected,
  pointed,
  weekOnly,
  onSelect,
  onMonthChange,
}: IProp) => {
  const { color } = useTheme();
  const [date, setDate] = useState([year, month]);
  const { close, isOpened } = useBottomSheet();
  const { startDay, endDate } = getDates(date);

  const handleChangeDate = (direction: "left" | "right") => {
    const [currYear, currMonth] = date;
    const newDate =
      direction === "left"
        ? currMonth === 1
          ? [currYear - 1, 12]
          : [currYear, currMonth - 1]
        : currMonth === 12
          ? [currYear + 1, 1]
          : [currYear, currMonth + 1];

    setDate(newDate);
    onMonthChange && onMonthChange(newDate);
  };

  const handleClick = (event: string) => {
    if (isOpened) close();
    onSelect && onSelect(event);
  };

  const renderWeekOnly = () => {
    const weekRow = [];
    let startDate = todate - dayNum;
    for (let i = 0; i < 7; i++) {
      if (startDate < 1 || startDate > endDate) {
        weekRow.push(<View key={i} style={styles.day} />);
      } else {
        weekRow.push(renderDateCell(i, startDate));
      }
      startDate++;
    }
    return <View style={styles.weekContainer}>{weekRow}</View>;
  };

  const renderDateCell = (dayIndex: number, dayInMonth: number) => {
    const formedDate = `${date[0]}-${date[1].toString().padStart(2, "0")}-${dayInMonth
      .toString()
      .padStart(2, "0")}`;
    return (
      <View key={dayIndex} style={{ position: "relative" }}>
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
          onPress={() => handleClick(formedDate)}
        >
          {dayInMonth + ""}
        </Text>
        {pointed?.includes(formedDate) && (
          <View
            style={{
              ...styles.pointMarker,
              backgroundColor: color("main", 500, true),
            }}
          />
        )}
      </View>
    );
  };

  const renderWeekRows = () => {
    let dayInMonth = 1;
    const weeks = [];

    for (let week = 0; week < Math.ceil((endDate + startDay) / 7); week++) {
      const weekRow = [];
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < startDay) || dayInMonth > endDate) {
          weekRow.push(<View key={day} style={styles.day} />);
        } else {
          weekRow.push(renderDateCell(day, dayInMonth));
          dayInMonth++;
        }
      }
      weeks.push(
        <View key={week} style={styles.weekContainer}>
          {weekRow}
        </View>,
      );
    }
    return weeks;
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
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="label"
          fontLevel={1}
        >
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
        {daysTable.map((i) => (
          <Text
            key={i}
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
      {weekOnly ? renderWeekOnly() : renderWeekRows()}
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
  },
  pointMarker: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 100,
    bottom: 0,
    alignSelf: "center",
  },
});
