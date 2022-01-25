import React from "react";
import { Route, Routes } from "react-router-dom";

import HeaderLayout from "@/layout/HeaderLayout";

import { NoMatch } from "@/components/NoMatch";

const Artifacts = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        {/*<Route element={<SideMenuLayoutIntercept />}>*/}
        {/*</Route>*/}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Artifacts;
