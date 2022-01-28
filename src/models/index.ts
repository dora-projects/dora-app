import { Models } from "@rematch/core";

import notifications from "./notifications";
import userInfo from "./userInfo";
import projectList from "./projectList";
import userConfig from "./userConfig";

export interface RootModel extends Models<RootModel> {
  notifications: typeof notifications;
  userInfo: typeof userInfo;
  projectList: typeof projectList;
  userConfig: typeof userConfig;
}

export const models: RootModel = {
  notifications,
  userInfo,
  projectList,
  userConfig,
};
