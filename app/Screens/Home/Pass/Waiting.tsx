import { Text, View } from "@/Components";

const typeTable = {
  APPLICATION: "외출",
  EARLY_RETURN: "조기 귀가",
  CLASSROOM: "교실 이동",
};

interface IProp {
  type?: keyof typeof typeTable;
}

export const Waiting = ({ type }: IProp) => {
  return (
    <View style={{ gap: 6, alignItems: "center" }}>
      <Text colorType="main" colorLevel={500} fontType="subTitle" fontLevel={2}>
        {typeTable[type]} 수락 대기 중입니다
      </Text>
      <Text colorType="gray" colorLevel={500} fontType="caption" fontLevel={2}>
        상태가 바뀌면 픽에서 알림을 드릴게요!
      </Text>
    </View>
  );
};
