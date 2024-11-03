import { IApplicationIn } from "@/apis";
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
} from "@/Components";
import { TimePickerButton } from "@/Components/TimePickerButton";
import { useBottomSheet, useMyMutation, useOptions, useTheme, useToast } from "@/hooks";
import { useState } from "react";

export const Out = ({ navigation }) => {
  const { periodType } = useOptions();
  const { mutate: outMutate } = useMyMutation<IApplicationIn, null>("post", "application", "");
  const { success } = useToast();
  const { color } = useTheme();
  const { open } = useBottomSheet();

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
    <Layout Header={<PrevHedaer title="외출 신청" />} style={{ alignItems: "flex-start" }}>
      <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
        외출 신청
      </Text>
      <LabelLayout label="희망 외출 시간을 선택하세요" type="black">
        {periodType === 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
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
              width: "100%",
              height: 40,
              paddingHorizontal: 15,
              backgroundColor: color("gray", 50),
              flexDirection: "row",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: data.start && data.end ? "center" : "flex-start",
              gap: 60,
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
                <View style={{ alignItems: "center", gap: 3, flexDirection: "row" }}>
                  <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
                    {data.start}교시{" "}
                  </Text>
                  <Text colorType="gray" colorLevel={800} fontType="label" fontLevel={1}>
                    부터
                  </Text>
                </View>
                <View style={{ alignItems: "center", gap: 3, flexDirection: "row" }}>
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
  );
};
