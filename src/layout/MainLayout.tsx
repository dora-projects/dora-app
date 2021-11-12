import * as React from "react";
import ProLayout from "@ant-design/pro-layout";
import { AppstoreOutlined, AreaChartOutlined, SettingOutlined } from "@ant-design/icons";
import Logo from "@/assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import RightContent from "@/components/RightContent";

const MainLayout: React.FC = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <ProLayout
      logo={Logo}
      title={"Dora"}
      layout={"top"}
      disableContentMargin
      location={{ pathname }}
      fixedHeader
      fixSiderbar
      contentStyle={{ height: "calc(100vh - 48px)" }}
      rightContentRender={() => <RightContent />}
      onMenuHeaderClick={() => {
        window.location.href = "/";
      }}
      menuProps={{
        onClick: (menu: any) => {
          navigator(menu.key);
        },
      }}
      route={{
        routes: [
          {
            path: "/projects",
            name: " 我的项目",
            icon: <AppstoreOutlined />,
          },
          {
            path: "/setting",
            name: " 设置",
            icon: <SettingOutlined />,
          },
        ],
      }}
    >
      {children}
    </ProLayout>
  );
};

export default MainLayout;
