import * as React from "react";

import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SmileOutlined, HeartOutlined } from "@ant-design/icons";

import complexMenu from "./Menu";
import Logo from "../../assets/logo.svg";

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
              name: "收藏",
              icon: <SmileOutlined />,
            },
            {
              path: "/home/overview",
              name: "FaceBook",
              icon: <HeartOutlined />,
            },
            {
              path: "/home/search",
              name: "Twitter",
              icon: <HeartOutlined />,
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
          rightContentRender={() => (
            <div>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </div>
          )}
          menuHeaderRender={false}
        >
          <PageContainer content="欢迎使用">
            <div>Hello World</div>
          </PageContainer>
        </ProLayout>
      </ProLayout>
    </div>
  );
};
