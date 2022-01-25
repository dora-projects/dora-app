import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentProjectInfo, useLoginUserStore, useMyProjectListStore } from "@/stores";
import { FullLoading } from "@/components/Loading";

const ProtectedWrap = () => {
  const location = useLocation();

  const { loading: loadingUser, fetchUserInfo, userInfo } = useLoginUserStore();
  const { loading: loadingProjects, fetchMyProjects, projects } = useMyProjectListStore();
  const { setProject } = useCurrentProjectInfo();

  useEffect(() => {
    fetchUserInfo().then();
    fetchMyProjects().then((r) => {
      // todo 改成接口
      // 默认第一个
      if (r?.data && r.data.length > 0) {
        const item = r.data[0];
        setProject(item);
      }
    });
  }, [fetchUserInfo, fetchMyProjects, setProject]);

  // 检查用户信息
  if (loadingUser) return <FullLoading loading={true} title={"获取用户信息..."} />;
  if (!userInfo) {
    return <Navigate to="/auth/login" />;
  }

  // 检查 创建第一个项目
  if (!loadingProjects && (!projects || projects?.length === 0) && location.pathname !== "/create-first-project") {
    return <Navigate to="/create-first-project" />;
  }

  return <Outlet />;
};

export default ProtectedWrap;
