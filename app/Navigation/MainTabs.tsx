import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { All, Apply, Home, Meal, Schedule } from "@/Screens";
import { Icon, iconType } from "@/Components";
import { Platform } from "react-native";
import { useTheme } from "@/hooks";

type componentType = ({ navigation }: { navigation: any }) => React.JSX.Element;

const { Navigator, Screen } = createBottomTabNavigator();

const getOption = (name: string, component: componentType, iconName: iconType) => ({
  name,
  component,
  options: {
    tabBarIcon: ({ focused }) => (
      <Icon name={iconName} colorType={focused ? "main" : "gray"} colorLevel={500} />
    ),
    unmountOnBlur: false
  },
});

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
        
        tabBarStyle: {
          backgroundColor: color("normal", "white", true),
          position: "absolute",
          elevation: 0,
          zIndex: 9999,
          borderColor: color("gray", 100, true),
          height: (Platform.OS === "ios" ? 50 : 60) + bottom,
          paddingBottom: (Platform.OS === "ios" ? 0 : 10) + bottom,
        },
      }}
    >
      <Screen {...getOption("홈", Home, "Home")} />
      <Screen {...getOption("급식", Meal, "Meal")} />
      <Screen {...getOption("신청", Apply, "Check")} />
      <Screen {...getOption("일정", Schedule, "Calander")} />
      <Screen {...getOption("전체", All, "All")} />
    </Navigator>
  );
};
