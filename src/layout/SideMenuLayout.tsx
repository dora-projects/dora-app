import * as React from "react";
import ProLayout from "@ant-design/pro-layout";
import {
  PieChartOutlined,
  ProfileOutlined,
  DashboardOutlined,
  AlertOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";

const SideMenu: React.FC = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const params = useParams();
  const appKey = params.appKey;

  const SubMenu = [
    {
      path: `/project/${appKey}/monitor/overview`,
      name: " 概览",
      icon: <PieChartOutlined />,
    },
    {
      path: `/project/${appKey}/monitor/issues`,
      name: " 错误异常",
      icon: <ProfileOutlined />,
    },
    {
      path: `/project/${appKey}/monitor/performance`,
      name: " 性能数据",
      icon: <DashboardOutlined />,
    },
    {
      path: `/project/${appKey}/monitor/releases`,
      name: " 版本",
      icon: <FileSyncOutlined />,
    },
    {
      path: `/project/${appKey}/monitor/alerts`,
      name: " 告警",
      icon: <AlertOutlined />,
    },
  ];

  return (
    <ProLayout
      title={"Dora"}
      siderWidth={150}
      location={{ pathname }}
      navTheme="light"
      layout={"side"}
      headerTheme={"light"}
      fixSiderbar
      fixedHeader
      headerRender={false}
      menuHeaderRender={false}
      // menuExtraRender={({ collapsed }) => !collapsed && <SwitchProject />}
      disableContentMargin
      onMenuHeaderClick={() => {
        window.location.href = "/";
      }}
      route={{
        routes: SubMenu,
      }}
      menuProps={{
        onClick: (menu: any) => {
          navigator(menu.key);
        },
      }}
    >
      {children}
    </ProLayout>
  );
};

const SideMenuLayout = () => {
  return (
    <SideMenu>
      <Outlet />
      <Footer />
    </SideMenu>
  );
};

export default SideMenuLayout;
