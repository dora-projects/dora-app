import * as React from "react";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const routes = [...protectedRoutes, ...publicRoutes];
  const element = useRoutes([...routes]);
  return <>{element}</>;
};
