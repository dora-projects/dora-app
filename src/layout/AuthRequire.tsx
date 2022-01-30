import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "@/store";
import { FullLoading } from "@/components/Loading";

const AuthRequire: React.FC = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.userInfo.fetchUserInfo();
  }, [dispatch]);

  const { userReq, userInfo } = useSelector((state: RootState) => ({
    userReq: state.loading.effects.userInfo.fetchUserInfo,
    userInfo: state.userInfo,
  }));

  React.useEffect(() => {
    if (userReq.error) {
      navigate("/auth/login");
      return;
    }
  }, [userReq, userInfo, navigate]);

  if (!userInfo) {
    return <FullLoading loading={true} title={"获取用户信息..."} />;
  }

  return <Outlet />;
};

export default AuthRequire;
