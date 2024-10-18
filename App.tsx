import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { useEffect, useRef, useState } from "react";
import { getItem, isAndroid } from "@/utils";
import { useColor, useTheme } from "@/hooks";
import { Navigation } from "@/Navigation";
import { StatusBar } from "@/Components";
import { Animated } from "react-native";
import { useFonts } from "expo-font";
import { Splash } from "@/Screens";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const { color } = useColor();
  const { theme } = useTheme();

  const [token, setToken] = useState<null | string>(null);
  const fade = useRef(new Animated.Value(1)).current;
  const [splash, setSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Medium: require("./app/assets/font/Medium.ttf"),
    Regular: require("./app/assets/font/Regular.ttf"),
    SemiBold: require("./app/assets/font/SemiBold.ttf"),
  });

  useEffect(() => {
    isAndroid && setBackgroundColorAsync(color("bg", 0, true));
  }, [theme]);

  useEffect(() => {
    getItem("access_token").then((res) => setToken(res));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fade, { toValue: 0, duration: 300, useNativeDriver: false }).start(() =>
        setSplash(false)
      );
    }, 2000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={color("bg")}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        {fontsLoaded && <Navigation token={token} />}
        {splash && <Splash fade={fade} />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
