import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import OuterLayout from "@/layout/OuterLayout";
import UserInfoSetting from "./routes/UserInfoSetting";
import SystemInfo from "./routes/SystemInfo";
import Projects from "./routes/Projects";
import Footer from "@/components/Footer";

export const Setting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <OuterLayout>
      <PageContainer
        title="设置管理"
        tabActiveKey={location.pathname}
        tabList={[
          {
            tab: "账号信息",
            key: "/setting/userinfo",
          },
          {
            tab: "项目管理",
            key: "/setting/project",
          },
          {
            tab: "系统状况",
            key: "/setting/system",
          },
        ]}
        onTabChange={(tab) => {
          navigate(tab);
        }}
      >
        <Routes>
          <Route path="userinfo" element={<UserInfoSetting />} />
          <Route path="project" element={<Projects />} />
          <Route path="system" element={<SystemInfo />} />
          <Route path="*" element={<Navigate to="userinfo" />} />
        </Routes>
        <Footer />
      </PageContainer>
    </OuterLayout>
  );
};
