import { useQueryUserInfo } from "@/api/auth";
import React from "react";
import { useLoginUserStore } from "@/stores/user";

export const useQueryLoginUser = () => {
  const { data, isFetching, refetch } = useQueryUserInfo();
  const { setUserInfo } = useLoginUserStore();

  const user = React.useMemo(() => {
    return data?.data?.result;
  }, [data]);

  React.useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user, setUserInfo]);

  return { loading: isFetching, refetch, user };
};
