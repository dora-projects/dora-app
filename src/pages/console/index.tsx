import React, { useEffect } from "react";
import { Navigate, Route, Routes, Outlet, useLocation, useNavigate } from "react-router-dom";

import OuterLayout from "@/layout/OuterLayout";
import InnerLayout from "@/layout/InnerLayout";

import Overview from "./routes/Overview";
import Issues from "./routes/Issues";
import Performance from "./routes/Performance";
import Releases from "./routes/Releases";
import Alerts from "./routes/Alerts";
import SdkGuide from "./components/SdkGuide";
import Footer from "@/components/Footer";
import { NoMatch } from "@/components/NoMatch";

const ConsoleLayout: React.FC = (props) => {
  return (
    <OuterLayout>
      <InnerLayout>
        {/*<SdkGuide>*/}
        <Outlet />
        <Footer />
        {/*</SdkGuide>*/}
      </InnerLayout>
    </OuterLayout>
  );
};

const Console = () => {
  return (
    <Routes>
      <Route path="/" element={<ConsoleLayout />}>
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
