import React from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const SdkUsage = () => {
  return (
    <Typography>
      <pre>{`
# Using yarn
yarn add @sentry/browser @sentry/tracing
# Using npm
npm install --save @sentry/browser @sentry/tracing

import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://c4cff93a2c894c93b77737f8e575845f@your.site.cn//1",
  integrations: [new Integrations.BrowserTracing()],
  
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
        `}</pre>
    </Typography>
  );
};

export default SdkUsage;
