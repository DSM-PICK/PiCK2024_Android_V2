import { createStackNavigator } from "@react-navigation/stack";
import { stackNavigationOptions } from "@/constants";
import { Apply, WeekendMeal } from "@/Screens";

const { Navigator, Screen } = createStackNavigator();

export const ApplyStack = () => {
  return (
    <Navigator screenOptions={stackNavigationOptions} initialRouteName="내부신청">
      <Screen name="내부신청" component={Apply} />
      <Screen name="주말급식" component={WeekendMeal} />
    </Navigator>
  );
};
