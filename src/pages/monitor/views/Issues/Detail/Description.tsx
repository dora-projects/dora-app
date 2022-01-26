import React from "react";
import { Descriptions } from "antd";

interface Props {
  ip: string;
  url: string;
  uaParsed: any;
  sdk: {
    name: string;
    version: string;
  };
}

const Description = (props: Props) => {
  const browser = props.uaParsed?.browser || {};
  const engine = props.uaParsed?.engine || {};
  const os = props.uaParsed?.os || {};

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      <Descriptions title="" bordered>
        <Descriptions.Item label="os">
          <div>{os.name}</div>
          <div>{os.version}</div>
        </Descriptions.Item>

        <Descriptions.Item label="browser" span={2}>
          <div>{browser.name}</div>
          <div>{browser.major}</div>
          <div>{browser.version}</div>
        </Descriptions.Item>

        <Descriptions.Item label="engine">
          <div>{engine.name}</div>
          <div>{engine.version}</div>
        </Descriptions.Item>

        <Descriptions.Item label="ip" span={2}>
          <div>{props.ip}</div>
        </Descriptions.Item>

        <Descriptions.Item label="sdk">
          <div>{props.sdk?.name}</div>
          <div>{props.sdk?.version}</div>
        </Descriptions.Item>

        <Descriptions.Item label="url" span={2}>
          <div>{props.url}</div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Description;
