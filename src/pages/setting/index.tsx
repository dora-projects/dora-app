import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Menu, Switch, Divider } from "antd";

import MainLayout from "@/layout/MainLayout";
import UserInfo from "./routes/UserInfo";
import SystemInfo from "./routes/SystemInfo";
import UserManage from "./routes/UserManage";
import ProjectSetting from "./routes/ProjectSetting";

import Footer from "@/components/Footer";
import { NoMatch } from "@/components/NoMatch";

const { SubMenu } = Menu;

const SettingLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const menuList = [
    {
      name: "账号信息",
      path: "/setting/userinfo",
    },
    {
      name: "系统状况",
      path: "/setting/system",
    },
    {
      name: "系统用户",
      path: "/setting/users",
    },
    {
      name: "项目管理",
      path: "/setting/projects",
    },
  ];

  const activeMenu = menuList.find((menu) => {
    return location.pathname.indexOf(menu.path) > -1;
  });

  return (
    <MainLayout>
      <PageContainer
        title="设置"
        // breadcrumb={{
        //   routes: [
        //     {
        //       path: "",
        //       breadcrumbName: "一级页面",
        //     },
        //     {
        //       path: "",
        //       breadcrumbName: "二级页面",
        //     },
        //     {
        //       path: "",
        //       breadcrumbName: "当前页面",
        //     },
        //   ],
        // }}
      >
        <ProCard bodyStyle={{ padding: "10px" }}>
          <ProCard colSpan={{ xl: 4, lg: 6, sm: 8 }} bodyStyle={{ padding: 0 }}>
            <Menu
              selectedKeys={[activeMenu?.path as string]}
              style={{ border: "none" }}
              onClick={(menu) => {
                const { key } = menu;
                navigate(key);
              }}
            >
              {menuList.map((item) => {
                return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
              })}
            </Menu>
          </ProCard>
          <ProCard
            colSpan={{ xl: 20, lg: 18, sm: 16 }}
            style={{ borderLeft: "1px solid #f0f0f0" }}
            bodyStyle={{ padding: "0" }}
          >
            <Outlet />
          </ProCard>
        </ProCard>
        <Footer />
      </PageContainer>
    </MainLayout>
  );
};

const Setting = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingLayout />}>
        <Route index element={<Navigate to="userinfo" />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="system" element={<SystemInfo />} />
        <Route path="users" element={<UserManage />} />
        <Route path="projects/*" element={<ProjectSetting />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Setting;
