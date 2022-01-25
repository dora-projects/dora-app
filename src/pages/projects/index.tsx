import React from "react";
import { Route, Routes } from "react-router-dom";

import HeaderLayout from "@/layout/HeaderLayout";
import ProjectsLayout from "@/layout/ProjectsLayout";

import MyProjects from "./views/MyProjects";
import SdkUsage from "./views/SdkUsage";
import ProjectCreate from "./views/MyProjects/Create";

import { NoMatch } from "@/components/NoMatch";

const Projects = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route element={<ProjectsLayout />}>
          <Route index element={<MyProjects />} />
          <Route path=":appKey/sdk" element={<SdkUsage />} />
          <Route path="create" element={<ProjectCreate />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Projects;
