import { setPositionAsync, setBackgroundColorAsync } from "expo-navigation-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalManager } from "@/Components/Common/ModalManager";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated, StatusBar } from "react-native";
import { useOptions, useTheme } from "@/hooks";
import { getItem, isAndroid } from "@/utils";
import { ToastManager } from "@/Components";
import { Navigation } from "@/Navigation";
import { useFonts } from "expo-font";
import { Splash } from "@/Screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetManager } from "@/Components/Common/BottomSheetManager";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
  const { getTheme, theme, load: loadTheme } = useTheme();
  const { load: loadOptions } = useOptions();
  enableScreens(true);

  const [token, setToken] = useState<null | string>(null);
  const fade = useRef(new Animated.Value(1)).current;
  const [splash, setSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Medium: require("./app/assets/font/Medium.ttf"),
    Regular: require("./app/assets/font/Regular.ttf"),
    SemiBold: require("./app/assets/font/SemiBold.ttf"),
  });

  useEffect(() => {
    loadTheme();
    loadOptions();
  }, []);

  useEffect(() => {
    if (isAndroid) {
      setPositionAsync("absolute");
      setBackgroundColorAsync("#ffffff01");
    }
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
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={getTheme() === "dark" ? "light-content" : "dark-content"}
            />
            {fontsLoaded && <Navigation token={token} />}
            {splash && <Splash fade={fade} />}
            <ToastManager />
            <ModalManager />
            <BottomSheetManager />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
