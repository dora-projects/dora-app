import React from "react";
import { Outlet } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-layout";
import Footer from "@/components/Footer";

const ProjectsLayout = () => {
  return (
    <PageContainer title="ๆ็้กน็ฎ">
      <Outlet />
      <Footer />
    </PageContainer>
  );
};

export default ProjectsLayout;
