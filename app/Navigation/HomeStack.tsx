import { createStackNavigator } from "@react-navigation/stack";
import { Notice, NoticeDetail, Home } from "@/Screens";
import { stackNavigationOptions } from "@/constants";

const { Navigator, Screen } = createStackNavigator();

export const HomeStack = () => {
  return (
    <Navigator screenOptions={stackNavigationOptions} initialRouteName="내부홈">
      <Screen name="내부홈" component={Home} />
      <Screen name="공지사항" component={Notice} />
      <Screen name="상세보기" component={NoticeDetail} />
    </Navigator>
  );
};
