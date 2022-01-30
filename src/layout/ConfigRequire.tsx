import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "@/store";
import { FullLoading } from "@/components/Loading";

const ConfigRequire = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.userConfig.fetchUserConfig();
  }, [dispatch]);

  const { userConfigReq, userConfig } = useSelector((state: RootState) => ({
    userConfigReq: state.loading.effects.userConfig.fetchUserConfig,
    userConfig: state.userConfig,
  }));

  React.useEffect(() => {
    if (userConfigReq.error) {
      navigate("/create-first-project");
      return;
    }
    if (!userConfig?.project && userConfigReq.success) {
      navigate("/create-first-project");
      return;
    }
  }, [userConfigReq, userConfig, navigate]);

  if (!userConfig?.project) {
    return <FullLoading loading={true} title={"获取配置信息..."} />;
  }

  return <Outlet />;
};

export default ConfigRequire;
