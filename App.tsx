import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastManager, BottomSheetManager, ModalManager } from "@/Components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Animated, BackHandler, StatusBar } from "react-native";
import { useBottomSheet, useOptions, useTheme } from "@/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { enableScreens } from "react-native-screens";
import { useCallback, useEffect, useRef, useState } from "react";
import { getItem, navigationRef } from "@/utils";
import { Navigation } from "@/Navigation";
import { useFonts } from "expo-font";
import { Splash } from "@/Screens";
import { UpdateFlow, checkForUpdate } from "react-native-in-app-updates";

enableScreens(true);

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
  const [fontsLoaded] = useFonts({
    Medium: require("./app/assets/font/Medium.ttf"),
    Regular: require("./app/assets/font/Regular.ttf"),
    SemiBold: require("./app/assets/font/SemiBold.ttf"),
  });

  const fade = useRef(new Animated.Value(1)).current;

  const [status, requestPermission] = useMediaLibraryPermissions();
  const { getTheme, load: loadTheme } = useTheme();
  const { close, isOpened } = useBottomSheet();
  const { load: loadOptions } = useOptions();

  const [token, setToken] = useState<null | undefined | string>(undefined);
  const [splash, setSplash] = useState(true);

  const setupFlow = useCallback(
    async () => {
      try {
        await checkForUpdate(UpdateFlow.IMMEDIATE);
  
        const accessToken = await getItem("access_token");
        setToken(accessToken);
      } catch {
        setToken("");
      } finally {
        setTimeout(
          () =>
            Animated.timing(fade, { toValue: 0, duration: 300, useNativeDriver: false }).start(() =>
              setSplash(false)
            ),
          1500
        )
      }

    },
    []
  );

  useEffect(() => {
    setupFlow();
    loadTheme();
    loadOptions();
    if (!status?.granted) requestPermission();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      close();
      return isOpened;
    });
    return () => backHandler.remove();
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
            {splash && <Splash fade={fade} />}
            {fontsLoaded && token !== undefined && <Navigation token={token} />}
            <ToastManager />
            <ModalManager />
            <BottomSheetManager />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
