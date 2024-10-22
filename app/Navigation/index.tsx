import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Onboard, Login } from "@/Screens";
import { MainTabs } from "./MainTabs";

const { SlideFromRightIOS } = TransitionPresets;
const { Navigator, Screen } = createStackNavigator();

interface IProp {
  token: string | null;
}

export const Navigation = ({ token }: IProp) => {
  return (
    <Navigator
      screenOptions={{ headerShown: false, ...SlideFromRightIOS }}
      initialRouteName={token ? "메인" : "온보딩"}
    >
      <Screen name="온보딩" component={Onboard} />
      <Screen name="로그인" component={Login} />
      <Screen name="메인" component={MainTabs} />
    </Navigator>
  );
};
