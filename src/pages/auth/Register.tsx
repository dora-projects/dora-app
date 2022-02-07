import React, { useState } from "react";
import { Button } from "antd";
import ProForm, { ProFormText, LoginForm } from "@ant-design/pro-form";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store";
import Logo from "@/assets/logo.png";
import { useRequest } from "ahooks";
import { registerUser } from "@/services/auth";
import storage from "@/utils/storage";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();

  const { run: doRegisterUser, loading } = useRequest(registerUser, {
    manual: true,
    onSuccess: (res) => {
      const token = res?.data?.token;
      if (token) {
        storage.setToken(token);
        dispatch.notifications.add({
          type: "success",
          title: "欢迎使用",
        });
        navigate("/projects");
      }
    },
  });

  return (
    <div style={{ backgroundColor: "white", paddingTop: "30px" }}>
      <LoginForm
        logo={Logo}
        title="Dora"
        subTitle="前端监控系统"
        onFinish={async (values) => {
          const { email, password } = values || {};
          await doRegisterUser({ email, password });
        }}
        submitter={{
          render: (props) => {
            return [
              <Button
                loading={loading}
                type="primary"
                key="submit"
                size={"large"}
                style={{ width: "160px" }}
                onClick={() => props.form?.submit?.()}
              >
                注册
              </Button>,
              <Button
                style={{ width: "160px" }}
                key="cancel"
                size={"large"}
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                取消
              </Button>,
            ];
          },
        }}
      >
        <ProFormText
          name="email"
          fieldProps={{
            size: "large",
            autoComplete: "new-password",
            prefix: <MailOutlined className={"prefixIcon"} />,
          }}
          placeholder={"邮箱"}
          rules={[{ required: true, message: "请输入邮箱!" }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: "large",
            autoComplete: "new-password",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"密码"}
          rules={[{ required: true, message: "请输入密码！" }]}
        />
        <ProFormText.Password
          name="repeatPassword"
          fieldProps={{
            size: "large",
            autoComplete: "new-password",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"重复密码"}
          rules={[
            {
              required: true,
              message: "请重复输入密码！",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        />
      </LoginForm>
    </div>
  );
};
