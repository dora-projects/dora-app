import * as React from "react";
import ProLayout from "@ant-design/pro-layout";
import {
  PieChartOutlined,
  ProfileOutlined,
  DashboardOutlined,
  AlertOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SwitchProject from "./SwitchProject";

const ConsoleSideMenuLayout: React.FC = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const params = useParams();
  const appKey = params.appKey;

  const SubMenu = [
    {
      path: `/projects/${appKey}/console/overview`,
      name: " 概览",
      icon: <PieChartOutlined />,
    },
    {
      path: `/projects/${appKey}/console/issues`,
      name: " 错误异常",
      icon: <ProfileOutlined />,
    },
    {
      path: `/projects/${appKey}/console/performance`,
      name: " 性能数据",
      icon: <DashboardOutlined />,
    },
    {
      path: `/projects/${appKey}/console/releases`,
      name: " 版本",
      icon: <FileSyncOutlined />,
    },
    {
      path: `/projects/${appKey}/console/alerts`,
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

export default ConsoleSideMenuLayout;
