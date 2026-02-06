import { Button, LabelLayout, Text, View } from "@/Components";
import { Animated, Easing, StyleSheet } from "react-native";
import { useModal, useMyQuery, useTheme } from "@/hooks";
import { useCallback, useEffect, useRef } from "react";
import { IEarlyReturnPass } from "@/apis";
import { getToday } from "@/utils";

export const Return = () => {
  const { color } = useTheme();
  const { close } = useModal();
  const { data: outPassData } = useMyQuery<IEarlyReturnPass>(
    "earlyReturn",
    "/my",
  );

  const date = getToday().fullDay;

  const moveValue = useRef(new Animated.Value(0)).current;

  const animation = useCallback(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveValue, {
            toValue: -1500,
            duration: 1000 * 10,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(moveValue, {
            toValue: 0,
            duration: 1000 * 8,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start(),
    [moveValue],
  );

  useEffect(() => animation(), [animation]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: color("bg"),
      }}
    >
      <View style={styles.titleContainer}>
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="subTitle"
          fontLevel={1}
        >
          확인증
        </Text>
        <View style={styles.dateContainer}>
          <View
            style={{ width: "100%", transform: [{ translateX: moveValue }] }}
          >
            <Text
              colorType="gray"
              colorLevel={500}
              fontType="body"
              fontLevel={1}
              style={{ width: 1800 }}
            >
              {date} {date} {date} {date} {date} {date} {date} {date} {date}{" "}
              {date} {date} {date} {date} {date} {date} {date} {date} {date}{" "}
              {date} {date} {date} {date}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <View style={{ gap: 5, alignItems: "flex-start" }}>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="heading"
            fontLevel={2}
          >
            {outPassData?.user_name}
          </Text>
          <Text
            colorType="gray"
            colorLevel={700}
            fontType="subTitle"
            fontLevel={3}
          >
            {outPassData?.grade + ""}학년 {outPassData?.class_num + ""}반{" "}
            {outPassData?.num + ""}번
          </Text>
        </View>
      </View>
      <LabelLayout label="귀가 시간">
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="subTitle"
          fontLevel={3}
        >
          {outPassData?.start}
        </Text>
      </LabelLayout>
      <LabelLayout label="사유">
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="subTitle"
          fontLevel={3}
        >
          {outPassData?.reason}
        </Text>
      </LabelLayout>
      <LabelLayout label="확인한 선생님">
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="subTitle"
          fontLevel={3}
        >
          {outPassData?.teacher_name} 선생님
        </Text>
      </LabelLayout>
      <Button style={{ borderRadius: 8, height: 36 }} onPress={() => close()}>
        확인
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    padding: 25,
    gap: 30,
    borderRadius: 16,
    paddingBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  dateContainer: {
    overflow: "hidden",
    width: "100%",
    flexShrink: 1,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
