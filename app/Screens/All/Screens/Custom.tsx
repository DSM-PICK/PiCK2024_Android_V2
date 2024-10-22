import { Layout, PrevHedaer, SlideMenu, Text, View } from "@/Components";

export const Custom = () => {
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
        icon="Main"
        title="메인페이지 설정"
        content="메인페이지에서 급식 또는 시간표를 볼 수 있어요!\n현재는 시간표으로 설정되어 있어요."
        buttonContent="급식으로 보기"
        onPressButton={() => {}}
      />
      <SlideMenu
        icon="Time"
        title="신청 단위 설정"
        content="픽에서 신청할 때 시간 또는 교시로 설정할 수 있어요!\n현재는 교시로 설정되어 있어요."
        buttonContent="시간으로 설정하기"
        onPressButton={() => {}}
      />
    </Layout>
  );
};
