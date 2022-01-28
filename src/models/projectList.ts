import { createModel } from "@rematch/core";
import type { RootModel } from ".";

import { getMyProjects } from "@/services/project";

type ProjectsState = Project[] | null;

const projectList = createModel<RootModel>()({
  state: null as ProjectsState,
  reducers: {
    setList(state, payload: ProjectsState) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async fetchUserProjects() {
      const response = await getMyProjects();
      dispatch.projectList.setList(response?.data);
    },
  }),
});

export default projectList;
