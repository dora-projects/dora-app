import { axios } from "@/common/axios";

export const searchUsers = (searchStr: string) => {
  return axios.get("api/search/users", { params: { searchStr } });
};
