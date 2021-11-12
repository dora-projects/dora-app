import React, { useEffect } from "react";
import { Navigate, Route, Routes, Outlet, useParams, useNavigate } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import ConsoleLayout from "./components/Layout";
import Overview from "./routes/Overview";
import Issues from "./routes/Issues";
import Performance from "./routes/Performance";
import Releases from "./routes/Releases";
import Alerts from "./routes/Alerts";
import Footer from "@/components/Footer";
import { NoMatch } from "@/components/NoMatch";
import { FullLoading } from "@/components/Loading";
import { useConsoleProjectInfo } from "@/pages/console/store/project";
import GetProjectInfoFailed from "@/pages/console/components/GetProjectInfoFailed";

const Container: React.FC = (props) => {
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
    <MainLayout>
      <ConsoleLayout>
        {/*<SdkGuide>*/}
        <Outlet />
        <Footer />
        {/*</SdkGuide>*/}
      </ConsoleLayout>
    </MainLayout>
  );
};

const Console = () => {
  const params = useParams();
  const appKey = params.appKey;

  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Navigate to={`${appKey}/overview`} />} />
        <Route path=":appKey/overview" element={<Overview />} />
        <Route path=":appKey/issues" element={<Issues />} />
        <Route path=":appKey/performance" element={<Performance />} />
        <Route path=":appKey/releases" element={<Releases />} />
        <Route path=":appKey/alerts" element={<Alerts />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Console;
