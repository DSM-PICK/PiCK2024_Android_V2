import { Icon, View } from "@/Components";
import { useColor } from "@/hooks";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@/Screens/Home";

const { Navigator, Screen } = createBottomTabNavigator();

const TestComponent = () => {
  const { color } = useColor();
  return <View style={{ flex: 1, backgroundColor: color("bg") }}></View>;
};

export const MainTabs = () => {
  const { bottom } = useSafeAreaInsets();
  const { color } = useColor();
  const getColor = (focused: boolean) =>
    focused ? color("main", 500, true) : color("gray", 500, true);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color("main", 500, true),
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Medium",
        },
        tabBarStyle: {
          backgroundColor: color("bg", 0, true),
          borderColor: color("gray", 100, true),
          height: (Platform.OS === "ios" ? 50 : 60) + bottom,
          paddingBottom: (Platform.OS === "ios" ? 0 : 10) + bottom,
        },
      }}
    >
      <Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="Home" color={getColor(focused)} />,
        }}
      />
      <Screen
        name="급식"
        component={TestComponent}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="Meal" color={getColor(focused)} />,
        }}
      />
      <Screen
        name="신청"
        component={TestComponent}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="Check" color={getColor(focused)} />,
        }}
      />
      <Screen
        name="일정"
        component={TestComponent}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="Calander" color={getColor(focused)} />,
        }}
      />
      <Screen
        name="전체"
        component={TestComponent}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="All" color={getColor(focused)} />,
        }}
      />
    </Navigator>
  );
};
