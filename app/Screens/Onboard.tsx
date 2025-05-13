import { Icon, Layout, Text, View, TouchableOpacity } from "@/Components";
import { PickMan } from "@/assets";
import { useTheme } from "@/hooks";

export const Onboard = ({ navigation }) => {
  const { color } = useTheme();
  return (
    <Layout>
      <PickMan style={{ marginTop: "auto", marginBottom: "auto" }} />
      <View style={{ width: "100%", display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
        <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={500}>
          DSM Google 게정으로 로그인해주세요
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: color("gray", 400),
            width: "100%",

            justifyContent: "center",
            paddingVertical: 4,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
          onPress={() => navigation.navigate("로그인")}
        >
          <Icon name="Google" />
          <Text fontType="button" fontLevel={1} colorType="gray" colorLevel="black">
            Google 계정으로 로그인
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
