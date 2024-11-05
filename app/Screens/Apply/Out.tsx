import { useBottomSheet, useMyMutation, useOptions, useTheme, useToast } from "@/hooks";
import { StyleSheet } from "react-native";
import { IApplicationIn } from "@/apis";
import { useState } from "react";
import {
  Button,
  changePropType,
  LabelLayout,
  Layout,
  PrevHedaer,
  Text,
  TextInput,
  TimePicker,
  TouchableOpacity,
  View,
  KeyboardDismiss,
  TimePickerButton,
} from "@/Components";

export const Out = ({ navigation }) => {
  const { mutate: outMutate } = useMyMutation<IApplicationIn, null>("post", "application", "");

  const { periodType } = useOptions();
  const { open } = useBottomSheet();
  const { success } = useToast();
  const { color } = useTheme();

  const [data, setData] = useState<IApplicationIn>({
    reason: "",
    start: "",
    end: "",
    application_type: !!periodType ? "CLASS" : "TIME",
  });

  const handleChange = (e: changePropType, id: string) => {
    setData({
      ...data,
      [id]: !!periodType
        ? `${e.hour + "교시"}`
        : `${e.hour.padStart(2, "0")}:${e.minute.padStart(2, "0")}`,
    });
  };

  return (
    <KeyboardDismiss>
      <Layout Header={<PrevHedaer title="외출 신청" />} style={{ alignItems: "flex-start" }}>
        <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
          외출 신청
        </Text>
        <LabelLayout label="희망 외출 시간을 선택하세요" type="black">
          {periodType === 0 ? (
            <View style={styles.periodPickerContainer}>
              <TimePickerButton
                title={`외출 시작 ${!!periodType ? "교시를" : "시간을"} 선택하세요`}
                type={!!periodType ? "class" : "time"}
                value={data.start}
                id="start"
                onChange={handleChange}
              />
              <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
                부터
              </Text>
              <TimePickerButton
                title={`외출 종료 ${!!periodType ? "교시를" : "시간을"} 선택하세요`}
                type={!!periodType ? "class" : "time"}
                value={data.end}
                id="end"
                onChange={handleChange}
              />
              <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
                까지
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                ...styles.classPickerContainer,
                backgroundColor: color("gray", 50),
                justifyContent: data.start && data.end ? "center" : "flex-start",
              }}
              activeOpacity={1}
              onPress={() =>
                open(
                  <TimePicker
                    title="외출 시작과 복귀 교시를 선택해주세요"
                    buttonTitle="선 완료"
                    type="classMulti"
                    onEnd={(e) => setData({ ...data, start: e.hour, end: e.minute })}
                  />
                )
              }
            >
              {data.start && data.end ? (
                <>
                  <View style={styles.classPickerInnerContainer}>
                    <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
                      {data.start}교시{" "}
                    </Text>
                    <Text colorType="gray" colorLevel={800} fontType="label" fontLevel={1}>
                      부터
                    </Text>
                  </View>
                  <View style={styles.classPickerInnerContainer}>
                    <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
                      {data.end}교시{" "}
                    </Text>
                    <Text colorType="gray" colorLevel={800} fontType="label" fontLevel={1}>
                      까지
                    </Text>
                  </View>
                </>
              ) : (
                <Text colorType="gray" colorLevel={500} fontType="body" fontLevel={1}>
                  선택
                </Text>
              )}
            </TouchableOpacity>
          )}
        </LabelLayout>
        <LabelLayout label="외출 사유를 작성하세요" type="black">
          <TextInput
            value={data.reason}
            onChange={(e) => setData({ ...data, reason: e })}
            multiLine={6}
            placeholder="자세히 입력해주세요"
          />
        </LabelLayout>
        <Button
          style={{ position: "absolute", bottom: 30, alignSelf: "center" }}
          onPress={() =>
            outMutate(data, {
              onSuccess: () => {
                navigation.goBack();
                success("성공적으로 신청되었습니다!");
              },
            })
          }
          disabled={!(data.reason && data.start && data.end)}
        >
          신청하기
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  periodPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  classPickerContainer: {
    width: "100%",
    height: 40,
    paddingHorizontal: 15,
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    gap: 60,
  },
  classPickerInnerContainer: {
    alignItems: "center",
    gap: 3,
    flexDirection: "row",
  },
});
