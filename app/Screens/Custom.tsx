import { Layout, PrevHedaer, SlideMenu, Text, View } from "@/Components";
import { useOptions, useToast } from "@/hooks";
import { useState } from "react";

export const Custom = ({ navigation }) => {
  const { mainType, periodType, toggleOption } = useOptions();
  const { success } = useToast();
  const [open, setOpen] = useState(null);

  return (
    <Layout Header={<PrevHedaer title="커스텀" />} style={{ alignItems: "flex-start" }}>
      <View style={{ gap: 12 }}>
        <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
          커스텀
        </Text>
        <Text colorType="gray" colorLevel={500} fontType="body" fontLevel={1}>
          자신에게 맞는 홈 화면을 만들어보세요!
        </Text>
      </View>

      <SlideMenu
        open={open}
        setOpened={setOpen}
        id="mainConfig"
        icon="Main"
        title="메인페이지 설정"
        content="메인페이지에서 급식 또는 시간표를 볼 수 있어요!\n현재는 시간표으로 설정되어 있어요."
        buttonContent={(!!mainType ? "급식으" : "시간표") + "로 보기"}
        onPressButton={() => {
          toggleOption("mainType");
          success("성공적으로 변경되었습니다.");
          navigation.navigate("홈" as never);
        }}
      />
      <SlideMenu
        open={open}
        setOpened={setOpen}
        id="applyConfig"
        icon="Time"
        title="신청 단위 설정"
        content="픽에서 신청할 때 시간 또는 교시로 설정할 수 있어요!\n현재는 교시로 설정되어 있어요."
        buttonContent={(!!periodType ? "시간으" : "교시") + "로 설정"}
        onPressButton={() => {
          toggleOption("periodType");
          success("성공적으로 변경되었습니다.");
          navigation.navigate("신청" as never);
        }}
      />
    </Layout>
  );
};
