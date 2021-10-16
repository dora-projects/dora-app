import { Navigate, Route, Routes } from "react-router-dom";

import { OverviewLayout } from "./components/ConsoleLayout";
import { Overview } from "./routes/Overview";
import { Issues } from "./routes/Issues";
import { Performance } from "./routes/Performance";
import { Releases } from "./routes/Releases";
import { Alerts } from "./routes/Alerts";

export const Console = () => {
  return (
    <OverviewLayout>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="issues" element={<Issues />} />
        <Route path="performance" element={<Performance />} />
        <Route path="releases" element={<Releases />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="*" element={<Navigate to="overview" />} />
      </Routes>
    </OverviewLayout>
  );
};
