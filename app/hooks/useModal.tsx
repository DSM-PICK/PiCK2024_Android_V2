import { create } from "zustand";

interface IModal {
  component?: React.ReactElement;
  isOpened: boolean;
  open: (component: React.ReactElement) => void;
  close: () => void;
  set: {
    (
      partial:
        | IModal
        | Partial<IModal>
        | ((state: IModal) => IModal | Partial<IModal>),
      replace?: false,
    ): void;
    (state: IModal | ((state: IModal) => IModal), replace: true): void;
  };
}

export const useModal = create<IModal>((set, get) => ({
  component: undefined,
  isOpened: false,
  open: (component: React.ReactElement) => {
    if (!get().component && !get().isOpened) set({ component, isOpened: true });
  },
  close: () => set({ isOpened: false }),
  set,
}));
