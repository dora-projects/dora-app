import ProCard from "@ant-design/pro-card";
import { Button, Divider, Row, Col, Spin } from "antd";
import { useRequest } from "ahooks";
import { getEsStatus, getQueueCount } from "@/services/system";
import React from "react";

const QueueStats = () => {
  const {
    data: QueueData,
    refresh,
    loading,
  } = useRequest(getQueueCount, {
    pollingInterval: 1000,
  });
  return (
    <>
      <Button
        loading={loading}
        onClick={() => {
          refresh();
        }}
      >
        刷新 Queue
      </Button>
      <Divider />
      <code style={{ whiteSpace: "pre-wrap" }}> {JSON.stringify(QueueData?.data, null, 2)}</code>
    </>
  );
};

const EsStats = () => {
  const { data, refresh, loading } = useRequest(getEsStatus, {
    pollingInterval: 1000,
  });

  return (
    <>
      <Button
        loading={loading}
        onClick={() => {
          refresh();
        }}
      >
        刷新 ES
      </Button>
      <Divider />
      <code style={{ whiteSpace: "pre-wrap" }}> {JSON.stringify(data?.data, null, 2)}</code>
    </>
  );
};

const SystemInfo = () => {
  return (
    <ProCard title="系统状况" headerBordered>
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
