import * as React from "react";
import { RouteObject } from "react-router";
import Unauthorized from "@/components/UnAuthorized";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layout";
import { lazyImport } from "@/utils/lazyImport";
import { FullLoading } from "@/components/Loading";
import { useQueryLoginUser } from "@/common/hooks";

const ProtectedWrap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, user } = useQueryLoginUser();

  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  if (loading) return <FullLoading loading={true} title={"获取登录信息..."} />;
  if (!user) return <Unauthorized />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const { Dashboard } = lazyImport(() => import("@/pages/misc"), "Dashboard");

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedWrap />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "teams", element: <Dashboard /> },
      { path: "projects", element: <Dashboard /> },
      { path: "*", element: <Navigate to="/dashboard" /> },
    ],
  },
];
