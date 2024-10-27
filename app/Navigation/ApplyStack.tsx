import { createStackNavigator } from "@react-navigation/stack";
import { stackNavigationOptions } from "@/constants";
import { Apply, EarlyReturn, Move, Out, WeekendMeal } from "@/Screens";

const { Navigator, Screen } = createStackNavigator();

export const ApplyStack = () => {
  return (
    <Navigator screenOptions={stackNavigationOptions} initialRouteName="내부신청">
      <Screen name="내부신청" component={Apply} />
      <Screen name="주말급식" component={WeekendMeal} />
      <Screen name="교실이동" component={Move} />
      <Screen name="외출" component={Out} />
      <Screen name="조기귀가" component={EarlyReturn} />
    </Navigator>
  );
};
