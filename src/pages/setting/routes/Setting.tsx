import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import UserInfoSetting from "../components/UserInfoSetting";
import SystemInfo from "../components/SystemInfo";
import ProCard from "@ant-design/pro-card";

export const Setting = () => {
  const [tab, setTab] = React.useState("userinfo");

  return (
    <PageContainer
      tabList={[
        {
          tab: "账号信息",
          key: "userinfo",
        },
        {
          tab: "系统状况",
          key: "system",
        },
      ]}
      onTabChange={(tab) => {
        setTab(tab);
      }}
    >
      {tab === "userinfo" ? (
        <ProCard title="个人信息" bordered headerBordered>
          <UserInfoSetting />
        </ProCard>
      ) : null}

      {tab === "system" ? (
        <ProCard title="系统状态" bordered headerBordered>
          <SystemInfo />
        </ProCard>
      ) : null}
    </PageContainer>
  );
};
