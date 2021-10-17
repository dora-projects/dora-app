import React, { useState } from "react";
import { message, Button } from "antd";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Register = () => {
  return (
    <ProForm
      title="注册"
      submitter={{
        render: (props) => {
          return [
            <Button htmlType="button" key="edit">
              注册
            </Button>,
            <Button htmlType="button" key="read">
              返回
            </Button>,
          ];
        },
      }}
      onFinish={async (values) => {
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText
        name="username"
        fieldProps={{
          size: "large",
          prefix: <UserOutlined className={"prefixIcon"} />,
        }}
        placeholder={"用户名: admin or user"}
        rules={[
          {
            required: true,
            message: "请输入用户名!",
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: "large",
          prefix: <LockOutlined className={"prefixIcon"} />,
        }}
        placeholder={"密码: ant.design"}
        rules={[
          {
            required: true,
            message: "请输入密码！",
          },
        ]}
      />
    </ProForm>
  );
};

export default Register;
