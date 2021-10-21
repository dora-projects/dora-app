import create from "zustand";
import { devtools } from "zustand/middleware";
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
};

export const useLoginUserStore = create<UserInfoStore>(
  devtools((set) => ({
    userInfo: null,
    loading: true,
    fetchUserInfo: async () => {
      try {
        set({ loading: true });
        const response = await getLoginUserInfo();
        set({ userInfo: response?.data?.result, loading: false });
      } catch (e) {
        set({ userInfo: null, loading: false });
      }
    },
  }))
);
