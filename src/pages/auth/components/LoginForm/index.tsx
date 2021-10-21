import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from "@ant-design/pro-form";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { message, Tabs, Button } from "antd";

export const AccountPassword = () => (
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

export const EmailCode = () => (
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
