import { axios } from "@/common/axios";

export const queryByEql = (data: { eql: Record<string, any> }) => {
  return axios.post("/manager/analysis/eql", data);
};
