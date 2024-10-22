import {
  setPositionAsync,
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated, StatusBar } from "react-native";
import { getItem, isAndroid } from "@/utils";
import { useTheme } from "@/hooks";
import { Navigation } from "@/Navigation";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { Splash } from "@/Screens";
import { ToastManager } from "@/Components";

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
  const { getTheme, theme } = useTheme();
  const [imageStatus, imageRequest] = ImagePicker.useMediaLibraryPermissions();

  const [token, setToken] = useState<null | string>(null);
  const fade = useRef(new Animated.Value(1)).current;
  const [splash, setSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Medium: require("./app/assets/font/Medium.ttf"),
    Regular: require("./app/assets/font/Regular.ttf"),
    SemiBold: require("./app/assets/font/SemiBold.ttf"),
  });

  useEffect(() => {
    if (isAndroid) {
      setPositionAsync("absolute");
      setBackgroundColorAsync("#ffffff00");
      setButtonStyleAsync("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!imageStatus?.granted) {
      imageRequest();
    }
  }, [imageStatus]);

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
        <ToastManager />
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={getTheme() === "dark" ? "light-content" : "dark-content"}
        />
        {fontsLoaded && <Navigation token={token} />}
        {splash && <Splash fade={fade} />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
