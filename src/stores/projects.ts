import create from "zustand";
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
  fetchMyProjects: () => Promise<void>;
  clearProjects: () => void;
};

export const useProjectsStore = create<ProjectStore>((set) => ({
  projects: null,
  loading: true,
  fetchMyProjects: async () => {
    try {
      set({ loading: true });
      const response = await getMyProjects();
      set({ projects: response?.data, loading: false });
    } catch (e) {
      set({ projects: null, loading: false });
    }
  },
  clearProjects: () => {
    set({ projects: null, loading: true });
  },
}));
