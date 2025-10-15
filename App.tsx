import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastManager, BottomSheetManager, ModalManager } from "@/Components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Animated, BackHandler, StatusBar } from "react-native";
import { useBottomSheet, useOptions, useTheme } from "@/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { init, getCurrentScope } from "@sentry/react-native";
import { enableScreens } from "react-native-screens";
import { useCallback, useEffect, useRef, useState } from "react";
import { getItem, navigationRef } from "@/utils";
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
  enableScreens(true);
  const [fontsLoaded] = useFonts({
    Medium: require("./app/assets/font/Medium.ttf"),
    Regular: require("./app/assets/font/Regular.ttf"),
    SemiBold: require("./app/assets/font/SemiBold.ttf"),
  });
  const fade = useRef(new Animated.Value(1)).current;
  const handleClose = useRef<() => boolean | null>(null);

  const [status, requestPermission] = useMediaLibraryPermissions();
  const { getTheme, load: loadTheme } = useTheme();
  const { close, isOpened } = useBottomSheet();
  const { load: loadOptions } = useOptions();

  const [token, setToken] = useState<null | undefined | string>(undefined);
  const [splash, setSplash] = useState(true);

  const tokenPromise = useCallback(
    () =>
      new Promise(async (resolve) => {
        const accessToken = await getItem("access_token");
        setToken(accessToken);

        const userData = await getItem("user_data");
        const [id, username] = userData ? userData.split("||") : [undefined, undefined];
        getCurrentScope().setUser({ id: id || "알 수 없음", username: username || "알 수 없음" });
        resolve("test");
      }).then(() =>
        setTimeout(
          () =>
            Animated.timing(fade, { toValue: 0, duration: 300, useNativeDriver: false }).start(() =>
              setSplash(false)
            ),
          1500
        )
      ),
    []
  );

  useEffect(() => {
    tokenPromise();

    loadTheme();
    loadOptions();
    if (!status?.granted) requestPermission();
  }, []);

  useEffect(() => {
    handleClose.current = () => {
      close();
      return isOpened;
    };

    BackHandler.addEventListener("hardwareBackPress", () => handleClose.current?.());
    return () => handleClose.current = null;;
  }, [isOpened]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={getTheme() === "dark" ? "light-content" : "dark-content"}
            />
            {fontsLoaded && token !== undefined && <Navigation token={token} />}
            {splash && <Splash fade={fade} />}
            <ToastManager />
            <ModalManager />
            <BottomSheetManager />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
