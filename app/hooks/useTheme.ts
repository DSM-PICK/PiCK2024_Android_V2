import { create } from "zustand";

interface ITheme {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const useTheme = create<ITheme>((set, get) => ({
  theme: "dark",
  toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
}));
