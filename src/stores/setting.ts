import create from "zustand";
import { devtools } from "zustand/middleware";
import { getUserSetting } from "@/services/user";

type SettingProject = {
  project: {
    id: number;
    name: string;
    type: string;
    appKey: string;
  } | null;
  loading: boolean;
  fetchSetting: () => void;
};

export const useSettingStore = create<SettingProject>(
  devtools((set) => ({
    project: null,
    loading: true,
    fetchSetting: async () => {
      try {
        set(() => ({ loading: true }));
        const response = await getUserSetting();
        set({ project: response?.data?.project, loading: false });
      } catch (e) {
        set({ project: null, loading: false });
      }
    },
  }))
);
