import * as React from "react";
import { RouteObject } from "react-router";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";
import { FullLoading } from "@/components/Loading";
import { useAuth } from "@/hooks";

const { Dashboard } = lazyImport(() => import("@/features/misc"), "Dashboard");

const ProtectedRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useAuth();

  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  if (loading) return <FullLoading loading={true} title={"获取登录信息..."} />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoot />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <Navigate to="/dashboard" /> },
    ],
  },
];
