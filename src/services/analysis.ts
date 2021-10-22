import { axios } from "@/common/axios";

export const queryByEql = (data: { eql: Record<string, any> }) => {
  return axios.post("/api/analysis/eql", data);
};
