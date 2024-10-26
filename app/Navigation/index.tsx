import { createStackNavigator } from "@react-navigation/stack";
import { stackNavigationOptions } from "@/constants";
import { Onboard, Login, Alert } from "@/Screens";
import { MainTabs } from "./MainTabs";

const { Navigator, Screen } = createStackNavigator();

interface IProp {
  token: string | null;
}

export const Navigation = ({ token }: IProp) => {
  return (
    <Navigator screenOptions={stackNavigationOptions} initialRouteName={token ? "메인" : "온보딩"}>
      <Screen name="온보딩" component={Onboard} />
      <Screen name="로그인" component={Login} />
      <Screen name="메인" component={MainTabs} />
      <Screen name="알림" component={Alert} />
    </Navigator>
  );
};
