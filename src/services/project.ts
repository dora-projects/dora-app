import { axios } from "@/utils/axios";

export const createProject = (data: { name: string; detail: string; type: string }) => {
  return axios.put("/manager/project", data);
};

export const updateProject = (data: { id: number; name: string; detail: string; type: string }) => {
  return axios.post("/manager/project", data);
};

export const getProject = (params: { appKey?: string; id?: number }) => {
  return axios.get("/manager/project", { params });
};

export const deleteProject = (id: number) => {
  return axios.delete(`/manager/project/${id}`);
};

export const getMyProjects = () => {
  return axios.get("/manager/my/projects");
};

export const getProjectUsers = (params: { projectId?: number }) => {
  return axios.get("/manager/project/users", { params });
};

export const addProjectUsers = (data: { projectId: number; userIds: number[] }) => {
  return axios.post("/manager/project/addUsers", data);
};

export const removeProjectUsers = (data: { projectId: number; userId: number }) => {
  return axios.post("/manager/project/removeUsers", data);
};
