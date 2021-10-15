import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getLoginUserInfo = () => {
  return axios.get("/api/auth/me");
};

export const useQueryUserInfo = () => {
  return useQuery({
    queryKey: ["userinfo"],
    queryFn: () => getLoginUserInfo(),
  });
};
