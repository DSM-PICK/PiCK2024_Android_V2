import { createStackNavigator } from "@react-navigation/stack";
import { stackNavigationOptions } from "@/constants";
import * as _ from "@/Screens";

const { Navigator, Screen } = createStackNavigator();

export const AllStack = () => {
  return (
    <Navigator screenOptions={stackNavigationOptions} initialRouteName="내부전체">
      <Screen name="내부전체" component={_.All} />
      <Screen name="공지사항" component={_.Notice} />
      <Screen name="상세보기" component={_.NoticeDetail} />
      <Screen name="마이페이지" component={_.My} />
      <Screen name="커스텀" component={_.Custom} />
      <Screen name="알림설정" component={_.AlertConfig} />
      <Screen name="버그제보" component={_.Bug} />
      <Screen name="자습감독" component={_.SelfStudy} />
    </Navigator>
  );
};
