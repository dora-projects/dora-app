import ProCard from "@ant-design/pro-card";
import { Button, Divider, Row, Col, Spin } from "antd";
import { useRequest } from "ahooks";
import { getEsStatus, getQueueCount } from "@/services/system";
import React from "react";

const QueueStats = () => {
  const { data: QueueData, refresh, loading } = useRequest(getQueueCount);
  return (
    <>
      <Button
        onClick={() => {
          refresh();
        }}
      >
        刷新 Queue
      </Button>
      <Divider />
      <Spin spinning={loading}>
        <code style={{ whiteSpace: "pre-wrap" }}> {JSON.stringify(QueueData?.data, null, 2)}</code>
      </Spin>
    </>
  );
};

const EsStats = () => {
  const { data, refresh, loading } = useRequest(getEsStatus);

  return (
    <>
      <Button
        onClick={() => {
          refresh();
        }}
      >
        刷新 ES
      </Button>
      <Divider />
      <Spin spinning={loading}>
        <code style={{ whiteSpace: "pre-wrap" }}> {JSON.stringify(data?.data, null, 2)}</code>
      </Spin>
    </>
  );
};

const SystemInfo = () => {
  return (
    <ProCard title="系统状态" bordered headerBordered>
      <Row>
        <Col span={12}>
          <QueueStats />
        </Col>
        <Col span={12}>
          <EsStats />
        </Col>
      </Row>
    </ProCard>
  );
};

export default SystemInfo;
