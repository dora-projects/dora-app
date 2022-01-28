import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ProjectList from "./ProjectList";
import ProjectInfo from "./ProjectInfo";
import ProjectMember from "./ProjectMember";

import { NoMatch } from "@/components/NoMatch";

export const ProjectSetting = () => {
  return (
    <Routes>
      <Route index element={<ProjectList />} />
      <Route path=":appKey" element={<Navigate to="info" />} />
      <Route path=":appKey/info" element={<ProjectInfo />} />
      <Route path=":appKey/member" element={<ProjectMember />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
