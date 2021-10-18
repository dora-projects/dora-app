import * as React from "react";
import ProLayout from "@ant-design/pro-layout";
import {
  PieChartOutlined,
  ProfileOutlined,
  DashboardOutlined,
  AlertOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

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

export const OverviewLayout: React.FC = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <ProLayout
      title={"Dora"}
      siderWidth={150}
      location={{ pathname }}
      navTheme="light"
      route={{
        routes: SubMenu,
      }}
      fixSiderbar
      menuHeaderRender={false}
      headerRender={false}
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
