import { PickMan } from "@/assets";
import { Button, Layout } from "@/Components";

export const Onboard = ({ navigation }) => {
  return (
    <Layout bottomPad>
      <PickMan style={{ marginTop: "auto", marginBottom: "auto" }} />
      <Button
        onPress={() => navigation.navigate("로그인")}
        style={{ position: "absolute", bottom: 30 }}
      >
        로그인하고 PiCK 사용하기
      </Button>
    </Layout>
  );
};
