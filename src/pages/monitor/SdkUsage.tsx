import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Divider, Card, Space, Tabs } from "antd";
import { ArrowLeftOutlined, LinkOutlined } from "@ant-design/icons";
import { __DEV__ } from "@/config";
import { PageContainer } from "@ant-design/pro-layout";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

export const SdkUsage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const protocol = window.location.protocol;
  const host = __DEV__ ? "localhost:8000" : window.location.host;

  const sentry1 = `npm i @sentry/browser @sentry/tracing`;

  const sentry2 = `
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "${protocol}//${params?.appKey}@${host}//1",
  integrations: [new Integrations.BrowserTracing()],
  environment: "prod",
  release: "v1.0.0",
});
`;

  const dara1 = `npm i @doras/browser`;

  const dara2 = `
import { Browser } from "@doras/browser";

const instance = Browser({
  serverUrl: "${protocol}://${host}/api/report",
  appKey: "${params?.appKey}",
  appEnv: "prod",
  appVersion: "v0.0.1",
});

instance.start()
`;

  return (
    <PageContainer title="SDK 接入代码示列">
      <Card>
        <Space>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate(-1);
            }}
          >
            返回
          </Button>
        </Space>
        <Divider />
        <Tabs defaultActiveKey="1">
          <TabPane tab={"sentry sdk"} key="1">
            <Paragraph>
              <pre>{sentry1}</pre>
              <pre>{sentry2}</pre>
            </Paragraph>
            <Button
              type={"link"}
              icon={<LinkOutlined />}
              onClick={() => {
                // https://sentry-sdk-demo.vercel.app/
                window.open("https://sentry-sdk-demo.vercel.app/", "_blank");
              }}
            >
              sentry sdk demo page
            </Button>
          </TabPane>
          <TabPane tab={"dora react sdk"} key="2">
            <Paragraph>
              <pre>{dara1}</pre>
              <pre>{dara2}</pre>
            </Paragraph>
            <Button
              type={"link"}
              icon={<LinkOutlined />}
              onClick={() => {
                // https://dora-react-sdk-demo.vercel.app/
                window.open("https://dora-react-sdk-demo.vercel.app/", "_blank");
              }}
            >
              dora react sdk demo page
            </Button>
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};
