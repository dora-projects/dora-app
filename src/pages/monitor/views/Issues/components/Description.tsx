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
  const { browser, engine, os } = props.uaParsed || {};

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      <Descriptions title="" bordered>
        <Descriptions.Item label="os">{`${os?.name} ${os?.version}`}</Descriptions.Item>
        <Descriptions.Item label="browser">{`${browser?.name} ${browser?.major} ${browser?.version}`}</Descriptions.Item>
        <Descriptions.Item label="engine">{`${engine?.name} ${engine?.version}`}</Descriptions.Item>
        <Descriptions.Item label="ip">{props.ip}</Descriptions.Item>
        <Descriptions.Item label="url">{props.url}</Descriptions.Item>
        <Descriptions.Item label="sdk">
          {props.sdk?.name} v{props.sdk?.version}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Description;
