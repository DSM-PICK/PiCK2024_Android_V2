import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Notice, NoticeDetail, Home } from "@/Screens";

const { SlideFromRightIOS } = TransitionPresets;
const { Navigator, Screen } = createStackNavigator();

export const HomeStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        ...SlideFromRightIOS,
      }}
      initialRouteName="내부홈"
    >
      <Screen name="내부홈" component={Home} />
      <Screen name="공지사항" component={Notice} />
      <Screen name="상세보기" component={NoticeDetail} />
    </Navigator>
  );
};
