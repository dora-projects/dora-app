import { createModel } from "@rematch/core";
import type { RootModel } from ".";

import { getLoginUserInfo } from "@/services/auth";

type UserInfo = {
  id: number;
  username: string;
  email: string;
  role?: string;
  isActive?: boolean;
} | null;

const questions = createModel<RootModel>()({
  state: null as UserInfo,
  reducers: {
    serUserInfo(state, payload: UserInfo) {
      return payload;
    },
    clearUserInfo(state) {
      return null;
    },
  },
  effects: (dispatch) => ({
    async fetchUserInfo() {
      const response = await getLoginUserInfo();
      dispatch.userInfo.serUserInfo(response?.data);
    },
  }),
});

export default questions;
