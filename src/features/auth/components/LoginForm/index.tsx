import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from "@ant-design/pro-form";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { message, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "@/assets/logo.png";
import { useLogin } from "@/features/auth/api/login";
import storage from "@/utils/storage";
import { useNotificationStore } from "@/stores/notifications";

type LoginType = "email" | "code";

export default function Login() {
  const [loginType, setLoginType] = useState<LoginType>("email");
  const notificationsStore = useNotificationStore();
  const navigate = useNavigate();

  const login = useLogin();

  return (
    <div style={{ backgroundColor: "white", paddingTop: "30px" }}>
      <LoginForm
        logo={Logo}
        title="Dora"
        subTitle="前端监控系统"
        onFinish={async (values) => {
          const { email, password } = values;
          login.mutate(
            { email, password },
            {
              onSuccess(res) {
                const token = res?.data?.token;
                if (token) {
                  storage.setToken(token);
                  notificationsStore.addNotification({
                    type: "success",
                    title: "欢迎回来",
                  });
                  navigate("/dashboard");
                }
              },
            }
          );
        }}
      >
        <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={"email"} tab={"密码登录"} />
          <Tabs.TabPane key={"code"} tab={"验证码登录"} disabled />
        </Tabs>

        {loginType === "email" && <AccountPassword />}
        {loginType === "code" && <EmailCode />}

        {/*<div*/}
        {/*  style={{*/}
        {/*    display: "flex",*/}
        {/*    justifyContent: "space-between",*/}
        {/*    marginBottom: 24,*/}
        {/*  }}*/}
        {/*>*/}
        {/*<ProFormCheckbox noStyle name="autoLogin">*/}
        {/*  自动登录*/}
        {/*</ProFormCheckbox>*/}
        {/*<span>*/}
        {/*  <a*/}
        {/*    onClick={() => {*/}
        {/*      navigate("/auth/register");*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    去注册*/}
        {/*  </a>*/}
        {/*</span>*/}
        {/*</div>*/}
      </LoginForm>
    </div>
  );
}

const AccountPassword = () => (
  <>
    <ProFormText
      name="email"
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
