import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HeaderLayout from "@/layout/HeaderLayout";
import List from "./view/List";

import { NoMatch } from "@/components/NoMatch";
import { useCurrentProjectInfo } from "@/stores";

const Artifacts = () => {
  const { project } = useCurrentProjectInfo();
  if (!project?.appKey) return null;

  return (
    <Routes>
      <Route index element={<Navigate to={`/artifacts/${project?.appKey}/list`} />} />
      <Route element={<HeaderLayout />}>
        <Route path=":appKey/list" element={<List />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Artifacts;
