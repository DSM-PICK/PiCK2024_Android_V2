import { Header, Layout, View, ToggleSlide } from "@/Components";
import { TimeTable } from "./TimeTable";
import { Calander } from "./Calander";
import { useState } from "react";

export const Schedule = () => {
  const [open, setOpen] = useState("시간표");

  return (
    <Layout Header={<Header />} style={{ gap: 0, paddingHorizontal: 0 }} bottomPad>
      <View style={{ gap: 40, width: "100%", flex: 1 }}>
        <View style={{ paddingHorizontal: 24, width: "100%" }}>
          <ToggleSlide items={["시간표", "학사일정"]} onPress={setOpen} padding={24} />
        </View>
        {open === "시간표" ? <TimeTable /> : <Calander />}
      </View>
    </Layout>
  );
};
