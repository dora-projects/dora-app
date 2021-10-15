import create from "zustand";
import { devtools } from "zustand/middleware";

export type UserInfo = {
  id: number;
  username: string;
  email: string;
  role?: string;
  isActive?: boolean;
};

type UserInfoStore = {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
};

export const useLoginUserStore = create<UserInfoStore>(
  devtools((set) => ({
    userInfo: null,
    setUserInfo: (info) => {
      set((state) => ({ userInfo: info }));
    },
    clearUserInfo: () => {
      set((state) => ({ userInfo: null }));
    },
  }))
);
