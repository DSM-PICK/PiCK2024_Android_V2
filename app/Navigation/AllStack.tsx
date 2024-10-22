import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Notice, NoticeDetail, All, My, Custom } from "@/Screens";

const { SlideFromRightIOS } = TransitionPresets;
const { Navigator, Screen } = createStackNavigator();

export const AllStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...SlideFromRightIOS,
      }}
      initialRouteName="내부전체"
    >
      <Screen name="내부전체" component={All} />
      <Screen name="공지사항" component={Notice} />
      <Screen name="상세보기" component={NoticeDetail} />
      <Screen name="마이페이지" component={My} />
      <Screen name="커스텀" component={Custom} />
    </Navigator>
  );
};
