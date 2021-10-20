import { axios } from "@/common/axios";

export const createProject = (data: { name: string; detail: string; type: string }) => {
  return axios.put("/api/project", data);
};

export const updateProject = (data: { id: string; name: string; detail: string; type: string }) => {
  return axios.post("/api/project", data);
};

export const getProject = (params: { appKey?: string; id?: string }) => {
  return axios.get("/api/project", { params });
};

export const deleteProject = (id: number) => {
  return axios.delete(`/api/project/${id}`);
};

export const getMyProjects = () => {
  return axios.get("/api/my/projects");
};

export const getProjectUsers = (params: { projectId?: number }) => {
  return axios.get("/api/project/users", { params });
};

export const addProjectUsers = (data: { projectId: number; userIds: number[] }) => {
  return axios.post("/api/project/addUsers", data);
};

export const removeProjectUsers = (data: { projectId: number; userIds: number[] }) => {
  return axios.post("/api/project/removeUsers", data);
};
