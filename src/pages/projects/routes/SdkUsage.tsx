import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Divider, Card, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

const SdkUsage = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const code1 = `
# Using yarn
yarn add @sentry/browser @sentry/tracing
  `;

  const code2 = `
# Using npm
npm install --save @sentry/browser @sentry/tracing`;

  const code3 = `
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "${window.location.protocol}//${params?.appKey}@${window.location.host}//1",
  integrations: [new Integrations.BrowserTracing()],
  environment: "prod",
  release: "v1.0.0",
});
  `;

  return (
    <Card title="SDK 接入代码示列">
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => {
          navigate(-1);
        }}
      >
        返回
      </Button>
      <Divider />
      <Paragraph>
        <pre>{code1}</pre>
        <pre>{code2}</pre>
        <pre>{code3}</pre>
      </Paragraph>
    </Card>
  );
};

export default SdkUsage;
