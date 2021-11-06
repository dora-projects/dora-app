import React from "react";
import MainLayout from "@/layout/MainLayout";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import List from "./routes/List";
import { PageContainer } from "@ant-design/pro-layout";
import Footer from "@/components/Footer";

const ProjectsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MainLayout>
      <PageContainer title="我的项目">
        <Outlet />
        <Footer />
      </PageContainer>
    </MainLayout>
  );
};

const Projects = () => {
  return (
    <Routes>
      <Route element={<ProjectsLayout />}>
        <Route index element={<List />} />
      </Route>
    </Routes>
  );
};

export default Projects;
