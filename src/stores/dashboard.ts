import create from "zustand";
import { devtools } from "zustand/middleware";
import { getUserDashBoard } from "@/services/user";

type DashboardProject = {
  project: {
    id: number;
    name: string;
    type: string;
    apiKey: string;
  } | null;
  loading: boolean;
  fetchDashboard: () => void;
};

export const useDashboardStore = create<DashboardProject>(
  devtools((set) => ({
    project: null,
    loading: true,
    fetchDashboard: async () => {
      try {
        set(() => ({ loading: true }));
        const response = await getUserDashBoard();
        set({ project: response?.data, loading: false });
      } catch (e) {
        set({ project: null, loading: false });
      }
    },
  }))
);
