import create from "zustand";
import { getMyProjects } from "@/services/project";

type ProjectListStore = {
  projects: Project[] | null;
  loading: boolean;
  fetchMyProjects: () => Promise<void>;
  clearProjects: () => void;
};

export const useMyProjectListStore = create<ProjectListStore>((set) => ({
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
