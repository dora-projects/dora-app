import React from "react";
import { Button, Col, PageHeader, Row, Space } from "antd";
import dayjs from "@/utils/date";

interface SectionHeadProps {
  logContent: any;
  total: number;
  current: number;

  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const SectionHead = (props: SectionHeadProps) => {
  const { logContent, total, current } = props;

  return (
    <PageHeader
      ghost={false}
      title="详情"
      subTitle={`event_id: ${logContent?.event_id}`}
      onBack={() => {
        props.onBack();
      }}
    >
      <Row align="middle" gutter={[20, 20]}>
        <Col span={3}>
          <h3 className="text-gray-500">环境</h3>
          <code className="truncate">{logContent?.environment}</code>
        </Col>
        <Col span={4}>
          <h3 className="text-gray-500">版本</h3>
          <code className="truncate">{logContent?.release}</code>
        </Col>
        <Col span={3}>
          <h3 className="text-gray-500">总次数</h3>
          <code className="truncate">{total}</code>
        </Col>
        <Col span={3}>
          <h3 className="text-gray-500">当前第几条</h3>
          <code className="truncate">{current + 1}</code>
        </Col>
        <Col span={6}>
          <h3 className="text-gray-500">
            {logContent?.timestamp ? dayjs(logContent?.timestamp).format("YYYY/MM/DD HH:mm:ss") : null}
          </h3>
          <code className="truncate">{logContent?.timestamp ? dayjs(logContent?.timestamp).fromNow() : null}</code>
        </Col>
        <Col span={5}>
          <Space>
            <Button disabled={current === 0} onClick={() => props.onPrev()}>
              上一条
            </Button>
            <Button disabled={current + 1 === total || total === 0} onClick={() => props.onNext()}>
              下一条
            </Button>
          </Space>
        </Col>
      </Row>
    </PageHeader>
  );
};

export default SectionHead;
