import { RouteObject } from "react-router";
import { lazyImport } from "@/utils/lazyImport";
import * as React from "react";

const { AuthRoutes } = lazyImport(() => import("@/pages/auth"), "AuthRoutes");

export const publicRoutes: RouteObject[] = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
