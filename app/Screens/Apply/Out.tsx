import { IApplicationIn } from "@/apis";
import {
  Button,
  changePropType,
  LabelLayout,
  Layout,
  PrevHedaer,
  Text,
  TextInput,
  View,
} from "@/Components";
import { TimePickerButton } from "@/Components/TimePickerButton";
import { useMyMutation, useOptions, useToast } from "@/hooks";
import { useState } from "react";

export const Out = ({ navigation }) => {
  const { periodType } = useOptions();
  const { mutate: outMutate } = useMyMutation<IApplicationIn, null>("post", "application", "");
  const { success } = useToast();

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
      <LabelLayout label="희망 외출 시간을 선택하세요">
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
      </LabelLayout>
      <LabelLayout label="외출 사유를 작성하세요">
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
