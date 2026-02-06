import { create } from "zustand";

interface IBottomSheet {
  component?: React.ReactElement;
  isOpened: boolean;
  open: (component: React.ReactElement) => void;
  close: () => void;
  set: {
    (
      partial:
        | IBottomSheet
        | Partial<IBottomSheet>
        | ((state: IBottomSheet) => IBottomSheet | Partial<IBottomSheet>),
      replace?: false,
    ): void;
    (
      state: IBottomSheet | ((state: IBottomSheet) => IBottomSheet),
      replace: true,
    ): void;
  };
}
const defaultData = {
  component: undefined,
  isOpened: false,
};

export const useBottomSheet = create<IBottomSheet>((set, get) => ({
  ...defaultData,
  open: (component: React.ReactElement) => {
    set({ component, isOpened: true });
  },
  close: () => {
    set({ isOpened: false });
  },
  set,
}));
