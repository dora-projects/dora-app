import { useState } from "react";
import { Alert, Tabs, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginForm, ProFormCheckbox } from "@ant-design/pro-form";
import Logo from "@/assets/logo.png";
import { loginWithEmailAndPassword } from "@/services/auth";
import storage from "@/utils/storage";
import { useNotificationStore } from "@/stores/notifications";
import { useRequest } from "ahooks";
import { AccountPassword, EmailCode } from "../components/LoginForm";

type LoginType = "email" | "code";

export const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>("email");
  const notificationsStore = useNotificationStore();
  const navigate = useNavigate();

  const { run: login } = useRequest(loginWithEmailAndPassword, {
    manual: true,
    onSuccess(res) {
      const token = res?.data?.token;
      if (token) {
        storage.setToken(token);
        notificationsStore.addNotification({
          type: "success",
          title: "欢迎回来",
        });
        navigate("/projects");
      }
    },
  });

  const isDemoSite = window.location.host === "dora.nancode.cn";

  return (
    <>
      {isDemoSite && <Alert message="该站点为演示环境，项目数据可能随时会被清空!" type="warning" closable banner />}
      <div style={{ backgroundColor: "white", paddingTop: "30px" }}>
        <LoginForm
          logo={Logo}
          title="Dora"
          subTitle="前端监控系统"
          initialValues={{
            autoLogin: true,
          }}
          onValuesChange={(v, all) => {
            if (all.autoLogin) {
            }
          }}
          onFinish={async (values) => {
            const { email, password } = values;
            login({ email, password });
          }}
        >
          <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
            <Tabs.TabPane key={"email"} tab={"密码登录"} />
            <Tabs.TabPane key={"code"} tab={"验证码登录"} disabled />
          </Tabs>

          {loginType === "email" && <AccountPassword />}
          {loginType === "code" && <EmailCode />}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              记住我
            </ProFormCheckbox>
            <span>
              新用户？
              <Button
                type={"link"}
                style={{ padding: 0 }}
                onClick={() => {
                  navigate("/auth/register");
                }}
              >
                去注册
              </Button>
            </span>
          </div>
        </LoginForm>
      </div>
    </>
  );
};
