import { axios } from "@/common/axios";

export const searchUsers = (searchStr: string) => {
  return axios.get("api/search/users", { params: { searchStr } });
};

export const getUserDashBoard = () => {
  return axios.get("/api/dashboard");
};

export const updateUserDashBoard = (projectId: number) => {
  return axios.post("/api/dashboard", { projectId: projectId });
};
