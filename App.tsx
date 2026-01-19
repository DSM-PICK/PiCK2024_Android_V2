import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastManager, BottomSheetManager, ModalManager } from "@/Components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Alert, Animated, BackHandler, Linking, StatusBar } from "react-native";
import { useBottomSheet, useOptions, useTheme, useToast } from "@/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { enableScreens } from "react-native-screens";
import { useCallback, useEffect, useRef, useState } from "react";
import { getItem, navigationRef } from "@/utils";
import { Navigation } from "@/Navigation";
import { useFonts } from "expo-font";
import { Splash } from "@/Screens";
import InAppUpdates, { AndroidUpdateType } from "sp-react-native-in-app-updates";

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
  const inAppUpdatesRef = useRef(new InAppUpdates(false));
  const isMountedRef = useRef(true);

  const [status, requestPermission] = useMediaLibraryPermissions();
  const { getTheme, load: loadTheme } = useTheme();
  const { close, isOpened } = useBottomSheet();
  const { load: loadOptions } = useOptions();

  const [token, setToken] = useState<null | undefined | string>(undefined);
  const [splash, setSplash] = useState(true);

  const setupFlow = useCallback(async () => {
    try {
      const result = await inAppUpdatesRef.current.checkNeedsUpdate();
  
      if (result.shouldUpdate) {
        await inAppUpdatesRef.current.startUpdate({
          updateType: AndroidUpdateType.IMMEDIATE,
        }).catch(() => {
          Alert.alert(
            "업데이트 필요",
            "최신 버전 이용을 위해 스토어로 이동합니다.",
            [{ text: "확인", onPress: () => Linking.openURL('market://details?id=com.sixstandard.PICK') }]
          );
        });
      }
  
      const accessToken = await getItem("access_token");
      if (isMountedRef.current) {
        setToken(accessToken ?? null);
      }
    } catch (error) {
      const accessToken = await getItem("access_token");
      if (isMountedRef.current) {
        setToken(accessToken ?? null);
      }
    } finally {
      setTimeout(() => {
        if (!isMountedRef.current) return;
        Animated.timing(fade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (isMountedRef.current) setSplash(false);
        });
      }, 1500);
    }
  }, [fade]);

  useEffect(() => {
    setupFlow();
    loadTheme();
    loadOptions();
    if (!status?.granted) requestPermission();

    return () => {
      isMountedRef.current = false;
    };
  }, [setupFlow, loadTheme, loadOptions, status, requestPermission]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      close();
      return isOpened;
    });
    return () => backHandler.remove();
  }, [isOpened, close]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={getTheme() === "dark" ? "light-content" : "dark-content"}
            />
            {splash && <Splash fade={fade} />}
            {fontsLoaded && token !== undefined && (
              <Navigation token={token} />
            )}
            <ToastManager />
            <ModalManager />
            <BottomSheetManager />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
