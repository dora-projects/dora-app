import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "@/store";
import { FullLoading } from "@/components/Loading";

const ProtectedWrap: React.FC = (props) => {
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.userInfo.fetchUserInfo();
    dispatch.userConfig.fetchUserSetting();
  }, [dispatch]);

  const { userReq, userInfo } = useSelector((state: RootState) => ({
    userReq: state.loading.effects.userInfo.fetchUserInfo,
    userInfo: state.userInfo,
  }));

  const { userConfigReq, userConfig } = useSelector((state: RootState) => ({
    userConfigReq: state.loading.effects.userConfig.fetchUserSetting,
    userConfig: state.userConfig,
  }));

  // 检查用户信息
  if (userReq.error) {
    return <Navigate to="/auth/login" />;
  }
  if (userReq.loading || !userInfo) return <FullLoading loading={true} title={"获取用户信息..."} />;

  // 检查设置
  if (userConfigReq.error) {
    return <div>{(userConfigReq.error as Error).name}</div>;
  }
  if (!userConfigReq.loading && !userConfig?.project && window.location.pathname !== "/create-first-project") {
    return <Navigate to="/create-first-project" />;
  }

  return <Outlet />;
};

export default ProtectedWrap;
