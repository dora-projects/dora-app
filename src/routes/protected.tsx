import * as React from "react";
import { RouteObject } from "react-router";
import Unauthorized from "@/components/UnAuthorized";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { FullLoading } from "@/components/Loading";
import { useQueryLoginUser } from "@/common/hooks";
import { lazyImport } from "@/utils/lazyImport";

import { Console } from "@/pages/console";
import { Setting } from "@/pages/setting";

// const { Console } = lazyImport(() => import("@/pages/console"), "Console");
// const { Setting } = lazyImport(() => import("@/pages/setting"), "Setting");

const ProtectedWrap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, user } = useQueryLoginUser();

  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/console", { replace: true });
    }
  }, [location.pathname, navigate]);

  if (loading) return <FullLoading loading={true} title={"获取登录信息..."} />;
  // if (!user) return <Unauthorized />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedWrap />,
    children: [
      { path: "console/*", element: <Console /> },
      { path: "setting/*", element: <Setting /> },
      { path: "*", element: <Navigate to="/console" /> },
    ],
  },
];
