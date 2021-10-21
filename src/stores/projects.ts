import create from "zustand";
import { devtools } from "zustand/middleware";
import { getMyProjects } from "@/services/project";

export type Project = {
  id: number;
  name: string;
  type: string;
  detail: string;
};

type ProjectStore = {
  projects: Project[] | null;
  loading: boolean;
  fetchProjects: () => void;
};

export const useProjectsStore = create<ProjectStore>(
  devtools((set) => ({
    projects: null,
    loading: true,
    fetchProjects: async () => {
      try {
        set({ loading: true });
        const response = await getMyProjects();
        set({ projects: response?.data, loading: false });
      } catch (e) {
        set({ projects: null, loading: false });
      }
    },
  }))
);
