import { Button, Result } from "antd";
import * as React from "react";
import { useCountDown } from "ahooks";
import { useNavigate } from "react-router-dom";

const GetProjectInfoFailed = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate("/projects", { replace: false });
  };

  const [countdown] = useCountDown({ targetDate: Date.now() + 5000, onEnd: goBackPage });

  return (
    <Result
      style={{ marginTop: "50px" }}
      status="403"
      title={title}
      subTitle={`${Math.round(countdown / 1000)} 秒后跳转`}
      extra={
        <Button type="primary" onClick={() => goBackPage()}>
          去我的项目
        </Button>
      }
    />
  );
};

export default GetProjectInfoFailed;
