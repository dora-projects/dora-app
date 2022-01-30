import { axios } from "@/utils/axios";

export const updateUserInfo = (data: { id: number; username: string; email: string; password: string }) => {
  return axios.post("/manager/user/update", data);
};

export const searchUsers = (searchStr: string) => {
  return axios.get("/manager/search/users", { params: { searchStr } });
};

export const getUserConfig = () => {
  return axios.get("/manager/user/config");
};

export const updateUserConfig = (projectId: number) => {
  return axios.post("/manager/user/config", { projectId: projectId });
};

export const getUsers = () => {
  return axios.get("/manager/users");
};
