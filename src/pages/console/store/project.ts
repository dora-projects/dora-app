import create from "zustand";
import { devtools } from "zustand/middleware";
import { getProject } from "@/services/project";
import { sleep } from "@/utils/helper";

export type Project = {
  id: number;
  name: string;
  type: string;
  detail: string;
};

type ProjectStore = {
  project: Project | null;
  errorMessage: string;
  loading: boolean;
  fetchProject: (appKey: string) => void;
  clearProject: () => void;
};

export const useConsoleProjectInfo = create<ProjectStore>(
  devtools((set) => ({
    project: null,
    loading: true,
    errorMessage: "",
    fetchProject: async (appKey: string) => {
      try {
        set({ loading: true });
        // 慢一点
        await sleep(120);
        const response = await getProject({ appKey });
        set({ project: response?.data, loading: false });
      } catch (e: any) {
        const errorMessage = e.response?.data?.error?.message || "未找到该项目";
        set({ project: null, errorMessage, loading: false });
      }
    },
    clearProject: () => {
      set({ project: null, loading: true, errorMessage: "" });
    },
  }))
);
