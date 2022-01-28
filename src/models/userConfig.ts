import { createModel } from "@rematch/core";
import type { RootModel } from ".";

import { getUserSetting, updateUserSetting } from "@/services/user";

type Config = {
  project: Project | null;
};

const userConfig = createModel<RootModel>()({
  state: {
    project: null,
  } as Config,
  reducers: {
    setConfig(state, payload: Config) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async fetchUserSetting() {
      const response = await getUserSetting();
      if (response?.data) {
        dispatch.userConfig.setConfig(response?.data);
      }
    },
    async updateUserSetting(projectId: number) {
      const response = await updateUserSetting(projectId);
      if (response.data) {
        await dispatch.userConfig.fetchUserSetting();
      }
    },
  }),
});

export default userConfig;
