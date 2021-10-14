import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from "@ant-design/pro-form";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { message, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "@/assets/logo.png";

type LoginType = "account" | "email";

export default function Login() {
  const [loginType, setLoginType] = useState<LoginType>("email");
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "white", paddingTop: "30px" }}>
      <LoginForm logo={Logo} title="dora" subTitle=" " onFinish={async (values) => console.log(values)}>
        <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={"account"} tab={"密码登录"} />
          <Tabs.TabPane key={"email"} tab={"验证码登录"} />
        </Tabs>

        {loginType === "account" && <AccountPassword />}
        {loginType === "email" && <EmailCode />}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <span>
            <a
              onClick={() => {
                navigate("/auth/register");
              }}
            >
              去注册
            </a>
          </span>
        </div>
      </LoginForm>
    </div>
  );
}

const AccountPassword = () => (
  <>
    <ProFormText
      name="username"
      fieldProps={{
        size: "large",
        prefix: <MailOutlined className={"prefixIcon"} />,
      }}
      placeholder={"请输入邮箱"}
      rules={[
        {
          required: true,
          message: "请输入邮箱!",
        },
      ]}
    />
    <ProFormText.Password
      name="password"
      fieldProps={{
        size: "large",
        prefix: <LockOutlined className={"prefixIcon"} />,
      }}
      placeholder={"请输入密码"}
      rules={[
        {
          required: true,
          message: "请输入密码！",
        },
      ]}
    />
  </>
);

const EmailCode = () => (
  <>
    <ProFormText
      fieldProps={{
        size: "large",
        prefix: <MailOutlined className={"prefixIcon"} />,
      }}
      name="email"
      placeholder={"请输入邮箱"}
      rules={[
        {
          required: true,
          message: "请输入邮箱！",
        },
        {
          pattern: /^.+@.+\..+/,
          message: "邮箱错误！",
        },
      ]}
    />
    <ProFormCaptcha
      fieldProps={{
        size: "large",
        prefix: <LockOutlined className={"prefixIcon"} />,
      }}
      captchaProps={{
        size: "large",
      }}
      placeholder={"请输入验证码"}
      captchaTextRender={(timing, count) => {
        if (timing) {
          return `${count} ${"获取验证码"}`;
        }
        return "获取验证码";
      }}
      name="captcha"
      rules={[
        {
          required: true,
          message: "请输入验证码！",
        },
      ]}
      onGetCaptcha={async () => {
        message.success("获取验证码成功！验证码为：1234");
      }}
    />
  </>
);
