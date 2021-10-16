import * as React from "react";

import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { AppstoreOutlined, HeartOutlined, SettingOutlined } from "@ant-design/icons";

import complexMenu from "./Menu";
import RightContent from "./RightContent";

import Logo from "@/assets/logo.png";

type MainLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        logo={Logo}
        location={{
          pathname: "/home",
        }}
        collapsedButtonRender={false}
        collapsed
        route={{
          routes: [
            {
              path: "/home",
              name: "应用",
              icon: <AppstoreOutlined />,
            },
            {
              path: "/home/search",
              name: "设置",
              icon: <SettingOutlined />,
            },
          ],
        }}
        headerRender={false}
        disableContentMargin
      >
        <ProLayout
          location={{
            pathname: "/home/overview",
          }}
          navTheme="light"
          route={{
            routes: complexMenu,
          }}
          rightContentRender={() => <RightContent />}
          menuHeaderRender={false}
        >
          {children}
        </ProLayout>
      </ProLayout>
    </div>
  );
};
