import { createStackNavigator } from "@react-navigation/stack";
import { stackNavigationOptions } from "@/constants";
import { MainTabs } from "./MainTabs";
import * as _ from "@/Screens";

const { Navigator, Screen } = createStackNavigator();

interface IProp {
  token: string | null;
}

export const Navigation = ({ token }: IProp) => {
  return (
    <Navigator screenOptions={stackNavigationOptions} initialRouteName={token ? "메인" : "온보딩"}>
      <Screen name="온보딩" component={_.Onboard} />
      <Screen name="로그인" component={_.Login} />
      <Screen name="메인" component={MainTabs} />
      <Screen name="알림" component={_.Alert} />
      <Screen name="주말급식" component={_.WeekendMeal} />
      <Screen name="교실이동" component={_.Move} />
      <Screen name="외출" component={_.Out} />
      <Screen name="조기귀가" component={_.EarlyReturn} />
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
