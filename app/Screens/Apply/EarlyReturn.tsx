import { useMyMutation, useToast } from "@/hooks";
import { IEarlyReturnIn } from "@/apis";
import { useState } from "react";
import { Button, LabelLayout, Layout, PrevHedaer, Text, TextInput, KeyboardDismiss, TimePickerButton } from "@/Components";
import { StyleSheet } from "react-native";

export const EarlyReturn = ({ navigation }) => {
  const { mutate: outMutate } = useMyMutation<IEarlyReturnIn, null>("post", "earlyReturn", "/create");
  const { success, error } = useToast();

  const [data, setData] = useState<IEarlyReturnIn>({
    reason: "",
    start: "",
  });

  return (
    <KeyboardDismiss>
      <Layout Header={<PrevHedaer title="조기 귀가 신청" />} style={{ alignItems: "flex-start" }}>
        <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
          조기 귀가 신청
        </Text>
        <LabelLayout label="희망 귀가 시간을 선택하세요" type="black">
          <TimePickerButton title="귀가 시간을 선택하세요" type="time" value={data.start} onChange={(e) => setData({ ...data, start: `${e.hour.padStart(2, "0")}:${e.minute.padStart(2, "0")}` })} />
        </LabelLayout>
        <LabelLayout label="귀가 사유를 입력하세요" type="black">
          <TextInput value={data.reason} onChange={(e) => setData({ ...data, reason: e })} multiLine={6} placeholder="자세히 입력해주세요" />
        </LabelLayout>
        <Button
          style={styles.button}
          onPress={() =>
            outMutate(
              { ...data, start: data.start + ":00" },
              {
                onSuccess: () => success("조기 귀가 신청이 완료되었습니다!"),
                onError: (err: unknown) => {
                  if (err === 409) {
                    error("조기 귀가 신청을 실패했습니다.");
                  }
                },
                onSettled: () => navigation.replace("메인"),
              }
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
});
