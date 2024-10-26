import { Header, Layout, SlideMenu, Text } from "@/Components";
export * from "./WeekendMeal";

export const Apply = ({ navigation }) => {
  return (
    <Layout Header={<Header navigation={navigation.getParent()} />} style={{ gap: 20 }}>
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="heading"
        fontLevel={4}
        style={{ alignSelf: "flex-start" }}
      >
        신청
      </Text>
      <SlideMenu
        icon="Meal"
        title="주말 급식 신청"
        content="지금은 주말급식 신청 기간입니다.\n주말 급식 신청은 매달 한 번 한정된 기간에 합니다."
        buttonContent="신청하기"
        onPressButton={() => navigation.navigate("주말급식")}
      />
      <SlideMenu
        icon="People"
        title="교실 이동 신청"
        content="선생님께서 수락하시기 전엔 이동할 수 없습니다.\n수락 후 이동하시기 바랍니다."
        buttonContent="신청하기"
        onPressButton={() => {}}
      />
      <SlideMenu
        icon="Check"
        title="외출 신청"
        content="선생님께 미리 수락을 받은 뒤 신청합니다."
        buttonContent="신청하기"
        onPressButton={() => {}}
      />
      <SlideMenu
        icon="Bicycle"
        title="조기 귀가 신청"
        content="선생님께 미리 수락을 받은 뒤 신청합니다."
        buttonContent="신청하기"
        onPressButton={() => {}}
      />
    </Layout>
  );
};
