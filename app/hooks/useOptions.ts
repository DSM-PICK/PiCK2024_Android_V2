import { bulkGetItem, bulkSetItem } from "@/utils";
import { create } from "zustand";

interface IOptions {
  mainType: number;
  periodType: number;
  toggleOption: (type: "mainType" | "periodType") => void;
  load: () => void;
}

export const useOptions = create<IOptions>((set, get) => ({
  mainType: 0, // 0 - 급식으로, 1 - 시간표로
  periodType: 0, // 0 - 시간으로, 1 - 교시로
  toggleOption: (type) => {
    set({ [type]: +!get()[type] });
    bulkSetItem([
      ["mainType", get().mainType.toString()],
      ["periodType", get().periodType.toString()],
    ]);
  },
  load: async () => {
    const items = await bulkGetItem(["mainType", "periodType"]);
    set({ mainType: Number(items[0][1]), periodType: Number(items[1][1]) });
  },
}));
