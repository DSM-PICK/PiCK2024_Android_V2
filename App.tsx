import { setPositionAsync, setBackgroundColorAsync } from "expo-navigation-bar";
import { BottomSheetManager } from "@/Components/Common/BottomSheetManager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ModalManager } from "@/Components/Common/ModalManager";
import { Animated, BackHandler, StatusBar } from "react-native";
import { useBottomSheet, useOptions, useTheme } from "@/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { init, getCurrentScope } from "@sentry/react-native";
import { enableScreens } from "react-native-screens";
import { useEffect, useRef, useState } from "react";
import { getItem, isAndroid } from "@/utils";
import { ToastManager } from "@/Components";
import { Navigation } from "@/Navigation";
import { useFonts } from "expo-font";
import { Splash } from "@/Screens";

init({
  dsn: "https://69af4e84f735adb3673a42550260e390@o4507229156474880.ingest.us.sentry.io/4507229158113280",
});

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
  const [status, requestPermission] = useMediaLibraryPermissions();
  const { getTheme, theme, load: loadTheme } = useTheme();
  const { close, isOpened } = useBottomSheet();
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
    if (!status?.granted) {
      requestPermission();
    }
    getItem("access_token").then((res) => setToken(res));
    getItem("user_data").then((res) => {
      if (res) {
        const [id, username] = res.split("||");
        getCurrentScope().setUser({ id, username });
      }
    });
  }, []);

  useEffect(() => {
    if (isAndroid) {
      setPositionAsync("absolute");
      setBackgroundColorAsync("#ffffff01");
    }
  }, [theme]);

  useEffect(() => {
    const handleClose = () => {
      close();
      return isOpened;
    };

    BackHandler.addEventListener("hardwareBackPress", handleClose);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleClose);
    };
  }, [isOpened]);

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
