import { createModel } from "@rematch/core";
import type { RootModel } from ".";

import { getUserConfig, updateUserConfig } from "@/services/user";
import { sleep } from "@/utils/helper";

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
    async fetchUserConfig() {
      // await sleep(6 * 1000);
      const response = await getUserConfig();
      if (response?.data) {
        dispatch.userConfig.setConfig(response?.data);
      }
    },
    async updateUserConfig(projectId: number) {
      const response = await updateUserConfig(projectId);
      if (response.data) {
        await dispatch.userConfig.fetchUserConfig();
      }
    },
  }),
});

export default userConfig;
