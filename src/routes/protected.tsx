import React, { useEffect } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";

import CreateFPForm from "@/pages/createFirstProject";
import Artifacts from "@/pages/artifacts";
import Monitor from "@/pages/monitor";
import Setting from "@/pages/setting";
import Invite from "@/pages/invite";
import Projects from "@/pages/projects";

import ProtectedGuard from "@/layout/ProtectedGuard";
import { NoMatch } from "@/components/NoMatch";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedGuard />,
    children: [
      { index: true, element: <Navigate to={"/projects"} /> },
      { path: "create-first-project", element: <CreateFPForm /> },
      { path: "invite/:token", element: <Invite /> },
      { path: "projects/*", element: <Projects /> },
      { path: "artifacts/*", element: <Artifacts /> },
      { path: "monitor/*", element: <Monitor /> },
      { path: "setting/*", element: <Setting /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
];
