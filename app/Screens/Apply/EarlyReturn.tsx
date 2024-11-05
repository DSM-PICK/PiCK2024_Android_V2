import { IEarlyReturnIn } from "@/apis";
import { Button, LabelLayout, Layout, PrevHedaer, Text, TextInput } from "@/Components";
import { KeyboardDismiss } from "@/Components/Common/KeyboardDismiss";
import { TimePickerButton } from "@/Components/TimePickerButton";
import { useMyMutation, useToast } from "@/hooks";
import { useState } from "react";

export const EarlyReturn = ({ navigation }) => {
  const { mutate: outMutate } = useMyMutation<IEarlyReturnIn, null>(
    "post",
    "earlyReturn",
    "/create"
  );
  const { success } = useToast();

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
          <TimePickerButton
            title="조기 귀가 시간을 선택하세요"
            type="time"
            value={data.start}
            onChange={(e) =>
              setData({ ...data, start: `${e.hour.padStart(2, "0")}:${e.minute.padStart(2, "0")}` })
            }
          />
        </LabelLayout>
        <LabelLayout label="조기 귀가 사유를 작성하세요" type="black">
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
          disabled={!(data.reason && data.start)}
        >
          신청하기
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};
