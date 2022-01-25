import { axios } from "@/utils/axios";

export const updateUserInfo = (data: { id: number; username: string; email: string; password: string }) => {
  return axios.post("/manager/user/update", data);
};

export const searchUsers = (searchStr: string) => {
  return axios.get("/manager/search/users", { params: { searchStr } });
};

// export const getUserSetting = () => {
//   return axios.get("/manager/user/setting");
// };
//
// export const updateUserSetting = (projectId: number) => {
//   return axios.post("/manager/user/setting", { projectId: projectId });
// };

export const getUsers = () => {
  return axios.get("/manager/users");
};
