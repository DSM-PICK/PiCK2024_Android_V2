import {
  useBottomSheet,
  useMyMutation,
  useOptions,
  useTheme,
  useToast,
} from "@/hooks";
import { IEarlyReturnIn } from "@/apis";
import { useState } from "react";
import {
  Button,
  changePropType,
  LabelLayout,
  Layout,
  PrevHeader,
  Text,
  TextInput,
  KeyboardDismiss,
  TimePickerButton,
  TouchableOpacity,
  TimePicker,
} from "@/Components";
import { StyleSheet } from "react-native";

export const EarlyReturn = ({ navigation }) => {
  const { mutate: outMutate } = useMyMutation<IEarlyReturnIn, null>(
    "post",
    "earlyReturn",
    "/create",
  );
  const { periodType } = useOptions();
  const { open } = useBottomSheet();
  const { success, error } = useToast();
  const { color } = useTheme();

  const [data, setData] = useState<IEarlyReturnIn>({
    reason: "",
    start: "",
    application_type: !!periodType ? "PERIOD" : "TIME",
  });

  const handleChange = (e: changePropType) => {
    setData({
      ...data,
      start: `${e.hour.padStart(2, "0")}:${e.minute.padStart(2, "0")}`,
    });
  };

  return (
    <KeyboardDismiss>
      <Layout
        Header={<PrevHeader title="조기 귀가 신청" />}
        style={{ alignItems: "flex-start" }}
      >
        <Text
          colorType="normal"
          colorLevel="black"
          fontType="heading"
          fontLevel={4}
        >
          조기 귀가 신청
        </Text>
        <LabelLayout
          label={`희망 귀가 ${!!periodType ? "교시를" : "시간을"} 선택하세요`}
          type="black"
        >
          {periodType === 0 ? (
            <TimePickerButton
              title={`귀가 ${!!periodType ? "교시를" : "시간을"} 선택하세요`}
              type={!!periodType ? "class" : "time"}
              value={data.start}
              onChange={handleChange}
            />
          ) : (
            <TouchableOpacity
              style={{
                ...styles.classPickerContainer,
                backgroundColor: color("gray", 50),
                justifyContent: data.start ? "center" : "flex-start",
              }}
              activeOpacity={1}
              onPress={() =>
                open(
                  <TimePicker
                    title="귀가 교시를 선택해주세요"
                    buttonTitle="선택 완료"
                    type="class"
                    onEnd={(e) => setData({ ...data, start: e.hour + "교시" })}
                  />,
                )
              }
            >
              {data.start ? (
                <Text
                  colorType="normal"
                  colorLevel="black"
                  fontType="body"
                  fontLevel={1}
                >
                  {data.start}
                </Text>
              ) : (
                <Text
                  colorType="gray"
                  colorLevel={500}
                  fontType="body"
                  fontLevel={1}
                >
                  선택
                </Text>
              )}
            </TouchableOpacity>
          )}
        </LabelLayout>
        <LabelLayout label="귀가 사유를 입력하세요" type="black">
          <TextInput
            value={data.reason}
            maxLength={200}
            onChange={(e) => setData({ ...data, reason: e })}
            multiLine={6}
            placeholder="자세히 입력해주세요"
          />
        </LabelLayout>
        <Button
          style={styles.button}
          onPress={() =>
            outMutate(
              {
                ...data,
                start: periodType === 0 ? data.start + ":00" : data.start,
              },
              {
                onSuccess: () => success("조기 귀가 신청이 완료되었습니다!"),
                onError: (err) => {
                  if (err === 409) {
                    error("조기 귀가 신청을 실패했습니다.");
                  }
                },
                onSettled: () => navigation.replace("메인"),
              },
            )
          }
          disabled={!(data.reason && data.start)}
        >
          신청하기
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  classPickerContainer: {
    width: "100%",
    height: 40,
    paddingHorizontal: 15,
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
  },
});
