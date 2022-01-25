import React from "react";
import { useLocation } from "react-router";
import { Route, Routes, useNavigate } from "react-router-dom";

import HeaderLayout from "@/layout/HeaderLayout";
import SideMenuLayoutIntercept from "@/layout/SideMenuLayoutIntercept";

import Overview from "./views/Overview";
import Issues from "./views/Issues";
import IssueDetail from "./views/Issues/Detail";
import Performance from "./views/Performance";
import Releases from "./views/Releases";
import Alerts from "./views/Alerts";

import { NoMatch } from "@/components/NoMatch";
import { useCurrentProjectInfo } from "@/stores";

const Monitor = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const { project } = useCurrentProjectInfo();

  React.useEffect(() => {
    if (location.pathname === "/monitor" && project?.appKey) {
      navigate(`/monitor/${project?.appKey}/overview`, { replace: true });
    }
  }, [location.pathname, navigate, project?.appKey]);

  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route element={<SideMenuLayoutIntercept />}>
          <Route path=":appKey/overview" element={<Overview />} />
          <Route path=":appKey/issues" element={<Issues />} />
          <Route path=":appKey/issues/:fingerprint" element={<IssueDetail />} />
          <Route path=":appKey/performance" element={<Performance />} />
          <Route path=":appKey/releases" element={<Releases />} />
          <Route path=":appKey/alerts" element={<Alerts />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Monitor;
