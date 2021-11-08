import { axios } from "@/common/axios";

export const searchUsers = (searchStr: string) => {
  return axios.get("/manager/search/users", { params: { searchStr } });
};

export const getUserSetting = () => {
  return axios.get("/manager/user/setting");
};

export const updateUserSetting = (projectId: number) => {
  return axios.post("/manager/user/setting", { projectId: projectId });
};

export const getUsers = () => {
  return axios.get("/manager/users");
};
