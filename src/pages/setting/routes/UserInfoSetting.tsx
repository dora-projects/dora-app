import type { ProFormInstance } from "@ant-design/pro-form";
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormMoney,
  ProFormDigit,
} from "@ant-design/pro-form";
import ProCard from "@ant-design/pro-card";
import React from "react";

const UserInfoSetting = () => {
  return (
    <ProCard title="个人信息" bordered headerBordered>
      <ProForm onFinish={async (values) => {}}>
        <ProFormText width="md" name="username" label="用户名" placeholder="请输入用户名" />
        <ProFormText width="md" name="email" label="邮箱" placeholder="请输入名称" />
        <ProFormText.Password width="md" name="password" label="修改密码" placeholder="请输入密码" />
      </ProForm>
    </ProCard>
  );
};

export default UserInfoSetting;
