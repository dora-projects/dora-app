import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import OuterLayout from "@/layout/OuterLayout";
import UserInfo from "./routes/UserInfo";
import SystemInfo from "./routes/SystemInfo";
import Projects from "./routes/Projects";
import UserManage from "./routes/UserManage";
import Footer from "@/components/Footer";

const Setting = () => {
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
          {
            tab: "用户管理",
            key: "/setting/users",
          },
        ]}
        onTabChange={(tab) => {
          navigate(tab);
        }}
      >
        <Routes>
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="project" element={<Projects />} />
          <Route path="system" element={<SystemInfo />} />
          <Route path="users" element={<UserManage />} />
          <Route path="*" element={<Navigate to="userinfo" />} />
        </Routes>
        <Footer />
      </PageContainer>
    </OuterLayout>
  );
};

export default Setting;
