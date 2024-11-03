import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { All, Apply, Home, Meal, Schedule } from "@/Screens";
import { Platform } from "react-native";
import { Icon } from "@/Components";
import { useTheme } from "@/hooks";

const { Navigator, Screen } = createBottomTabNavigator();
const getColor = (focused: boolean) => (focused ? "main" : "gray");

export const MainTabs = () => {
  const { bottom } = useSafeAreaInsets();
  const { color } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color("main", 500, true),
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Medium",
        },
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          elevation: 0,
          zIndex: 9999,
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
          tabBarIcon: ({ focused }) => (
            <Icon name="Home" colorType={getColor(focused)} colorLevel={500} />
          ),
        }}
      />
      <Screen
        name="급식"
        component={Meal}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Meal" colorType={getColor(focused)} colorLevel={500} />
          ),
        }}
      />
      <Screen
        name="신청"
        component={Apply}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Check" colorType={getColor(focused)} colorLevel={500} />
          ),
        }}
      />
      <Screen
        name="일정"
        component={Schedule}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Calander" colorType={getColor(focused)} colorLevel={500} />
          ),
        }}
      />
      <Screen
        name="전체"
        component={All}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="All" colorType={getColor(focused)} colorLevel={500} />
          ),
        }}
      />
    </Navigator>
  );
};
