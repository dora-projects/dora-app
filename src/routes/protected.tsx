import React, { useEffect } from "react";
import { RouteObject } from "react-router";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserStore } from "@/stores/user";
import { useProjectsStore } from "@/stores/projects";

import Unauthorized from "@/components/UnAuthorized";
import { FullLoading } from "@/components/Loading";

import CreateFPForm from "@/pages/createFirstProject";
import Console from "@/pages/console";
import Setting from "@/pages/setting";
import Invite from "@/pages/invite";

import { NoMatch } from "@/components/NoMatch";
import Projects from "@/pages/projects";

const ProtectedWrap = () => {
  const location = useLocation();

  const { loading: loadingUser, fetchUserInfo, userInfo } = useLoginUserStore();
  const { loading: loadingProjects, fetchProjects, projects } = useProjectsStore();

  useEffect(() => {
    fetchUserInfo();
    fetchProjects();
  }, [fetchUserInfo, fetchProjects]);

  // 检查用户信息
  if (loadingUser) return <FullLoading loading={true} title={"获取登录信息..."} />;
  if (!userInfo) return <Unauthorized />;

  // 检查项目
  if (!loadingProjects && (!projects || projects?.length === 0) && location.pathname !== "/create-first-project") {
    return <Navigate to="/create-first-project" />;
  }

  return <Outlet />;
};

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedWrap />,
    children: [
      { index: true, element: <Navigate to={"/console"} /> },
      { path: "console/*", element: <Console /> },
      { path: "projects/*", element: <Projects /> },
      { path: "setting/*", element: <Setting /> },
      { path: "create-first-project", element: <CreateFPForm /> },
      { path: "invite/:token", element: <Invite /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
];
