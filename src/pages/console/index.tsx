import React, { useEffect } from "react";
import { Navigate, Route, Routes, Outlet, useLocation, useNavigate } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import ConsoleLayout from "@/layout/ConsoleLayout";
import Overview from "./routes/Overview";
import Issues from "./routes/Issues";
import Performance from "./routes/Performance";
import Releases from "./routes/Releases";
import Alerts from "./routes/Alerts";
import Footer from "@/components/Footer";
import { NoMatch } from "@/components/NoMatch";

const Container: React.FC = (props) => {
  return (
    <MainLayout>
      <ConsoleLayout>
        {/*<SdkGuide>*/}
        <Outlet />
        <Footer />
        {/*</SdkGuide>*/}
      </ConsoleLayout>
    </MainLayout>
  );
};

const Console = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Navigate to={"overview"} />} />
        <Route path="overview" element={<Overview />} />
        <Route path="issues" element={<Issues />} />
        <Route path="performance" element={<Performance />} />
        <Route path="releases" element={<Releases />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Console;
