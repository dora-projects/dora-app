import { axios } from "@/common/axios";

export const searchUsers = (searchStr: string) => {
  return axios.get("api/search/users", { params: { searchStr } });
};

export const getUserSetting = () => {
  return axios.get("api/user/setting");
};

export const updateUserSetting = (projectId: number) => {
  return axios.post("api/user/setting", { projectId: projectId });
};
