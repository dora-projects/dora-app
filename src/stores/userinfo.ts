import create from "zustand";
import { getLoginUserInfo } from "@/services/auth";

export type UserInfo = {
  id: number;
  username: string;
  email: string;
  role?: string;
  isActive?: boolean;
};

type UserInfoStore = {
  userInfo: UserInfo | null;
  loading: boolean;
  fetchUserInfo: () => void;
  clearUserInfo: () => void;
};

export const useLoginUserStore = create<UserInfoStore>((set) => ({
  userInfo: null,
  loading: true,
  fetchUserInfo: async () => {
    try {
      set({ loading: true });
      const response = await getLoginUserInfo();
      set({ userInfo: response?.data, loading: false });
    } catch (e) {
      set({ userInfo: null, loading: false });
    }
  },
  clearUserInfo: () => {
    set({ userInfo: null, loading: true });
  },
}));
