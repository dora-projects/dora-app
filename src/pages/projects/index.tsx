import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import MainLayout from "@/layout/MainLayout";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useConsoleProjectInfo } from "./store/project";
import List from "./routes/List";
import SdkUsage from "./routes/SdkUsage";
import Overview from "./routes/Overview";
import Issues from "./routes/Issues";
import IssueDetail from "./routes/Issues/Detail";
import Performance from "./routes/Performance";
import Releases from "./routes/Releases";
import Alerts from "./routes/Alerts";
import { NoMatch } from "@/components/NoMatch";
import Footer from "@/components/Footer";
import { FullLoading } from "@/components/Loading";
import GetProjectInfoFailed from "./components/GetProjectInfoFailed";
import ConsoleSideMenuLayout from "./components/ConsoleSideMenuLayout";

const CommonLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const ProjectsLayout = () => {
  return (
    <PageContainer title="我的项目">
      <Outlet />
      <Footer />
    </PageContainer>
  );
};

const ConsoleLayout = () => {
  const params = useParams();
  const appKey = params.appKey;

  const { project, loading, errorMessage, fetchProject, clearProject } = useConsoleProjectInfo();
  React.useEffect(() => {
    fetchProject(appKey!);
  }, [appKey, fetchProject]);

  // 重置
  React.useEffect(() => {
    return () => clearProject();
  }, [clearProject]);

  // 检查项目信息
  if (loading) return <FullLoading loading={true} title={"获取项目信息..."} />;
  if (!project) return <GetProjectInfoFailed title={errorMessage} />;

  return (
    <ConsoleSideMenuLayout>
      <Outlet />
      <Footer />
    </ConsoleSideMenuLayout>
  );
};

const Projects = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route element={<ProjectsLayout />}>
          <Route index element={<List />} />
          <Route path=":appKey/sdk" element={<SdkUsage />} />
        </Route>
        <Route element={<ConsoleLayout />}>
          <Route path=":appKey/console/overview" element={<Overview />} />
          <Route path=":appKey/console/issues" element={<Issues />} />
          <Route path=":appKey/console/issues/:fingerprint" element={<IssueDetail />} />
          <Route path=":appKey/console/performance" element={<Performance />} />
          <Route path=":appKey/console/releases" element={<Releases />} />
          <Route path=":appKey/console/alerts" element={<Alerts />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Projects;
