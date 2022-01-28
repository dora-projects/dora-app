import * as React from "react";
import { Routes } from "react-router";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NoMatch } from "@/components/NoMatch";

import ProtectedGuard from "@/layout/ProtectedGuard";
import HeaderLayout from "@/layout/HeaderLayout";
import SideMenuLayout from "@/layout/SideMenuLayout";
import ProjectsLayout from "@/layout/ProjectsLayout";
import SettingSideMenuLayout from "@/layout/SettingSideMenuLayout";

import * as Auth from "@/pages/auth";
import CreateFPForm from "@/pages/createFirstProject";
import Invite from "@/pages/invite";
import { Artifacts } from "@/pages/artifacts";
import { UserProjects, ProjectCreate } from "@/pages/userProjects";
import { Alerts, Overview, Performance, Issues, IssuesDetail, Releases, SdkUsage } from "@/pages/monitor";
import { SystemInfo, ProjectSetting, UserInfo, UserManage } from "@/pages/setting";

const Setting = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route element={<SettingSideMenuLayout />}>
          <Route index element={<Navigate to="userinfo" />} />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="system" element={<SystemInfo />} />
          <Route path="users" element={<UserManage />} />
          <Route path="projects/*" element={<ProjectSetting />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Route>
    </Routes>
  );
};

const ProjectList = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route element={<ProjectsLayout />}>
          <Route index element={<UserProjects />} />
          <Route path="create" element={<ProjectCreate />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

const Project = () => {
  const appKey = useSelector((state: RootState) => state.userConfig?.project?.appKey);
  const DefaultPage = <Navigate to={`/project/${appKey}/monitor/overview`} />;

  return (
    <Routes>
      <Route index element={DefaultPage} />
      <Route path=":appKey" element={<HeaderLayout />}>
        <Route path="install" element={<SdkUsage />} />
        <Route path="artifacts" element={<Artifacts />} />
        <Route path="monitor" element={<SideMenuLayout />}>
          <Route index element={DefaultPage} />
          <Route path="overview" element={<Overview />} />
          <Route path="issues/:fingerprint" element={<IssuesDetail />} />
          <Route path="issues" element={<Issues />} />
          <Route path="performance" element={<Performance />} />
          <Route path="releases" element={<Releases />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth.Login />} />
      <Route path="/register" element={<Auth.Register />} />
      <Route path="/" element={<ProtectedGuard />}>
        <Route path="create-first-project" element={<CreateFPForm />} />
        <Route path="invite/:token" element={<Invite />} />
        <Route path="projects/*" element={<ProjectList />} />
        <Route path="project/*" element={<Project />} />
        <Route path="setting/*" element={<Setting />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
