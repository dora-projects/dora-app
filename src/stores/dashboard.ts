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
  isEmpty: boolean;
  fetch: () => void;
};

export const useDashboardStore = create<DashboardProject>(
  devtools((set) => ({
    project: null,
    isEmpty: false,
    fetch: async () => {
      const response = await getUserDashBoard();
      if (response?.data?.project) {
        set({ isEmpty: false, project: response.data.project });
      } else {
        set({ isEmpty: true });
      }
    },
  }))
);
