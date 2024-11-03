import { Layout, Profile, Header } from "@/Components";
import { WeekendMeal } from "./WeekendMeal";
import { TimeTable } from "./TimeTable";
import { SelfStudy } from "./SelfStudy";
import { useOptions } from "@/hooks";
import { Notice } from "./Notice";
import { Meal } from "./Meal";
import { Pass } from "./Pass";

export const Home = ({ navigation }) => {
  const { mainType } = useOptions();

  return (
    <Layout
      Header={<Header navigation={navigation.getParent()} />}
      scrollAble
      bottomPad
      style={{ paddingHorizontal: 0 }}
    >
      <WeekendMeal />
      <Profile style={{ paddingHorizontal: 24, width: "100%" }} />
      <Pass />
      {!!!mainType ? <Meal /> : <TimeTable />}
      <SelfStudy />
      <Notice />
    </Layout>
  );
};
