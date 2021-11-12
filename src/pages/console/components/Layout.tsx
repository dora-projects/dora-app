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

const ConsoleLayout: React.FC = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const params = useParams();
  const appKey = params.appKey;

  const SubMenu = [
    {
      path: `/console/${appKey}/overview`,
      name: " 大盘",
      icon: <PieChartOutlined />,
    },
    {
      path: `/console/${appKey}/issues`,
      name: " 异常列表",
      icon: <ProfileOutlined />,
    },
    {
      path: `/console/${appKey}/performance`,
      name: " 性能数据",
      icon: <DashboardOutlined />,
    },
    {
      path: `/console/${appKey}/releases`,
      name: " 版本",
      icon: <FileSyncOutlined />,
    },
    {
      path: `/console/${appKey}/alerts`,
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

export default ConsoleLayout;
