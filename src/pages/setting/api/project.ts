import { axios } from "@/common/axios";
import { useMutation } from "react-query";

export type projectCreateDto = {
  name: string;
  detail: string;
  type: string;
};

export const createProject = (data: projectCreateDto) => {
  return axios.put("/api/project", data);
};

export const useCreateProject = () => {
  return useMutation((data: projectCreateDto) => createProject(data));
};
