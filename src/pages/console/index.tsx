import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDashboardStore } from "@/stores/dashboard";

import OuterLayout from "@/layout/OuterLayout";
import InnerLayout from "@/layout/InnerLayout";

import Overview from "./routes/Overview";
import Issues from "./routes/Issues";
import Performance from "./routes/Performance";
import Releases from "./routes/Releases";
import Alerts from "./routes/Alerts";
import Footer from "@/components/Footer";

export const Console = () => {
  const fetch = useDashboardStore((s) => s.fetch);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <OuterLayout>
      <InnerLayout>
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="issues" element={<Issues />} />
          <Route path="performance" element={<Performance />} />
          <Route path="releases" element={<Releases />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="*" element={<Navigate to="overview" />} />
        </Routes>
        <Footer />
      </InnerLayout>
    </OuterLayout>
  );
};
