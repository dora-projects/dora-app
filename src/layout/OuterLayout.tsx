import * as React from "react";
import ProLayout from "@ant-design/pro-layout";
import { AppstoreOutlined, SwapOutlined, SettingOutlined } from "@ant-design/icons";
import Logo from "@/assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const MainLayout: React.FC = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div style={{ height: "100vh" }}>
      <ProLayout
        logo={Logo}
        title={"Dora"}
        collapsedButtonRender={false}
        collapsed
        disableContentMargin
        location={{ pathname }}
        fixedHeader
        fixSiderbar
        route={{
          routes: [
            {
              path: "/console",
              name: " 概览",
              icon: <AppstoreOutlined />,
            },
            {
              path: "/setting",
              name: " 设置",
              icon: <SettingOutlined />,
            },
          ],
        }}
        headerRender={false}
        menuProps={{
          onClick: (menu: any) => {
            navigator(menu.key);
          },
        }}
      >
        {children}
      </ProLayout>
    </div>
  );
};

export default MainLayout;
