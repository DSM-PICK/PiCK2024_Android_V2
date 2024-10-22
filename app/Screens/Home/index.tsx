import { Layout, Profile, Header, View } from "@/Components";
import { TimeTable } from "./TimeTable";
import { SelfStudy } from "./SelfStudy";
import { Notice } from "./Notice";
import { Meal } from "./Meal";

export const Home = () => {
  return (
    <Layout Header={<Header />} scrollAble style={{ paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 24, width: "100%" }}>
        <Profile />
      </View>
      <Meal />
      <SelfStudy />
      <Notice />
    </Layout>
  );
};
