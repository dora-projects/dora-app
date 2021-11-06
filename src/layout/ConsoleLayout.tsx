import * as React from "react";
import { Menu } from "antd";
import ProLayout from "@ant-design/pro-layout";
import {
  PieChartOutlined,
  ProfileOutlined,
  DashboardOutlined,
  AlertOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import { AppstoreOutlined, SwapOutlined, SettingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import RightContent from "@/components/RightContent";
import SwitchProject from "@/components/SwitchProject";

const SubMenu = [
  {
    path: "/console/overview",
    name: " 大盘",
    icon: <PieChartOutlined />,
  },
  {
    path: "/console/issues",
    name: " 异常列表",
    icon: <ProfileOutlined />,
  },
  {
    path: "/console/performance",
    name: " 性能数据",
    icon: <DashboardOutlined />,
  },
  {
    path: "/console/releases",
    name: " 版本",
    icon: <FileSyncOutlined />,
  },
  {
    path: "/console/alerts",
    name: " 告警",
    icon: <AlertOutlined />,
  },
];

const ConsoleLayout: React.FC = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

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
      menuExtraRender={({ collapsed }) => !collapsed && <SwitchProject />}
      disableContentMargin
      contentStyle={{ overflowY: "scroll", overflowX: "hidden" }}
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

export default ConsoleLayout;
