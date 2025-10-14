import { create } from 'zustand';

interface ISignupState {
  state: {
    account_id: string;
    password: string;
    name: string;
    grade: number;
    class_num: number;
    num: number;
    code: string;
  };
  setAccountInfo: (email: string, code: string) => void;
  setPassword: (password: string) => void;
  setStudentInfo: (name: string, grade: number, class_num: number, num: number) => void;
  clear: () => void;
}

export const useSignupState = create<ISignupState>((set) => ({
  state: {
    account_id: '',
    password: '',
    name: '',
    grade: 0,
    class_num: 0,
    num: 0,
    code: '',
  },
  
  setAccountInfo: (email: string, code: string) => {
    set((current) => ({
      state: {
        ...current.state,
        account_id: email,
        code: code,
      }
    }));
  },
  
  setPassword: (password: string) => {
    set((current) => ({
      state: {
        ...current.state,
        password: password,
      }
    }));
  },
  
  setStudentInfo: (name: string, grade: number, class_num: number, num: number) => {
    set((current) => ({
      state: {
        ...current.state,
        name: name,
        grade: grade,
        class_num: class_num,
        num: num,
      }
    }));
  },
  
  clear: () => {
    set({
      state: {
        account_id: '',
        password: '',
        name: '',
        grade: 0,
        class_num: 0,
        num: 0,
        code: '',
      }
    });
  },
}));