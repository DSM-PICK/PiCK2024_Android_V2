import { Header, Layout, View } from "@/Components";
import { useState } from "react";
import { Calander } from "./Calander";
import ToggleSlide from "@/Components/Common/ToggleSlide";
import { TimeTable } from "./TimeTable";

export const Schedule = ({ navigation }) => {
  const [open, setOpen] = useState("시간표");
  return (
    <Layout Header={<Header navigation={navigation} />} style={{ gap: 0, paddingHorizontal: 0 }}>
      <View style={{ gap: 40, width: "100%" }}>
        <View style={{ paddingHorizontal: 24, width: "100%" }}>
          <ToggleSlide items={["시간표", "학사일정"]} onPress={setOpen} padding={24} />
        </View>
        {open === "시간표" ? <TimeTable /> : <Calander />}
      </View>
    </Layout>
  );
};
