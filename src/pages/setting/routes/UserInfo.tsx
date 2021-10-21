import ProForm, { ProFormText } from "@ant-design/pro-form";
import ProCard from "@ant-design/pro-card";
import React from "react";
import { useLoginUserStore } from "@/stores/user";

const UserInfo = () => {
  const { userInfo } = useLoginUserStore();

  return (
    <ProCard title="个人信息" bordered headerBordered>
      <ProForm
        initialValues={{
          username: userInfo?.username,
          email: userInfo?.email,
        }}
        onFinish={async (values) => {}}
      >
        <ProFormText width="md" name="username" label="用户名" placeholder="请输入用户名" />
        <ProFormText width="md" name="email" label="邮箱" placeholder="请输入名称" />
        <ProFormText.Password width="md" name="password" label="修改密码" placeholder="请输入密码" />
      </ProForm>
    </ProCard>
  );
};

export default UserInfo;
