import { Image } from "react-native";
import { Layout, View, Button } from "@/Components";
import { useTheme } from "@/hooks";

export const Onboard = ({ navigation }) => {
  const { getTheme } = useTheme();
  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View></View>
      <Image
        style={{ width: "100%", height: 250 }}
        source={
          getTheme() === "light"
            ? require("@/assets/images/SplashLight.gif")
            : require("@/assets/images/SplashDark.gif")
        }
      />
      <Button onPress={() => navigation.navigate("로그인")}>로그인하고 PiCK사용하기</Button>
    </Layout>
  );
};
