import { Button, Result } from "antd";
import * as React from "react";
import { useCountDown } from "ahooks";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();

  const goLoginPage = () => {
    navigate("/auth/login", { replace: false });
  };

  const [countdown] = useCountDown({ targetDate: Date.now() + 5000, onEnd: goLoginPage });

  return (
    <Result
      style={{ marginTop: "50px" }}
      status="403"
      title="您没有登陆"
      subTitle={`${Math.round(countdown / 1000)} 秒后跳转登录页面`}
      extra={
        <Button type="primary" onClick={() => goLoginPage()}>
          去登录
        </Button>
      }
    />
  );
};

export default UnAuthorized;
