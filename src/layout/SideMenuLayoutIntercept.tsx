import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { useCurrentProjectInfo } from "@/stores";
import { FullLoading } from "@/components/Loading";
import GetProjectInfoFailed from "@/components/GetProjectInfoFailed";
import ConsoleSideMenuLayout from "@/components/ConsoleSideMenuLayout";

const SideMenuLayoutIntercept = () => {
  const params = useParams();
  console.log(params);
  const appKey = params.appKey;

  const { project, loading, errorMessage, fetchProject } = useCurrentProjectInfo();
  React.useEffect(() => {
    fetchProject(appKey!);
  }, [appKey, fetchProject]);

  // 检查项目信息
  // if (loading) return <FullLoading loading={true} title={"获取项目信息..."} />;
  // if (!project) return <GetProjectInfoFailed title={errorMessage} />;

  return (
    <ConsoleSideMenuLayout>
      <Outlet />
      <Footer />
    </ConsoleSideMenuLayout>
  );
};

export default SideMenuLayoutIntercept;