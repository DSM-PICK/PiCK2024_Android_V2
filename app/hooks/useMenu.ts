import { create } from "zustand";

interface IMenu {
  opened: string;
  open: (id: string) => void;
  close: () => void;
}

export const useMenu = create<IMenu>((set) => ({
  opened: "",
  open: (id: string) => set({ opened: id }),
  close: () => set({ opened: "" }),
}));
