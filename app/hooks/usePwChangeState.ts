import { create } from "zustand";

interface IPwChangeState {
  state: {
    code: string;
    account_id: string;
    password: string;
  };
  setAccountInfo: (code: string, email: string) => void;
  setPassword: (password: string) => void;
  clear: () => void;
}

export const usePwChangeState = create<IPwChangeState>((set) => ({
  state: {
    code: "",
    account_id: "",
    password: "",
  },

  setAccountInfo: (code: string, email: string) => {
    set((current) => ({
      state: {
        ...current.state,
        code: code,
        account_id: email,
      },
    }));
  },

  setPassword: (password: string) => {
    set((current) => ({
      state: {
        ...current.state,
        password: password,
      },
    }));
  },

  clear: () => {
    set({
      state: {
        code: "",
        account_id: "",
        password: "",
      },
    });
  },
}));
