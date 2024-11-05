import { Button, Layout } from "@/Components";
import { PickMan } from "@/assets";

export const Onboard = ({ navigation }) => {
  return (
    <Layout>
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
