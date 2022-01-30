import React from "react";
import { useRequest } from "ahooks";
import { Alert, Spin, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { queryLogs } from "@/services/analysis";

import Stacktrace from "./Stacktrace";
import Breadcrumbs from "./Breadcrumbs";
import Description from "./Description";
import SectionHead from "./SectionHead";

export const IssuesDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { appKey, fingerprint } = params;

  const [curIndex, setShowIndex] = React.useState(0);

  const { run, data, loading } = useRequest(queryLogs, { manual: true });

  React.useEffect(() => {
    run({
      appKey,
      fingerprint,
      type: "error",
      // from: filterVal.from,
      // to: filterVal.to,
      size: 999,
    });
  }, [appKey, fingerprint, run]);

  const hits = data?.data?.hits;
  const total = hits?.length;

  const logContent = React.useMemo(() => {
    if (hits && hits.length > 0) {
      return hits[curIndex]?._source;
    }
    return null;
  }, [hits, curIndex]);

  return (
    <div style={{ padding: "20px" }}>
      <Spin spinning={loading}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <SectionHead
              logContent={logContent}
              current={curIndex}
              total={total}
              onBack={() => {
                navigate(-1);
              }}
              onPrev={() => {
                if (curIndex === 0) return;
                setShowIndex(curIndex + -1);
              }}
              onNext={() => {
                const next = curIndex + 1;
                if (next === total) return;
                setShowIndex(next);
              }}
            />
          </Col>
          {!loading && !logContent && (
            <Col span={24}>
              <Alert message="错误" description={`日志丢失： (fingerprint) ${fingerprint}`} type="error" showIcon />
            </Col>
          )}
          <Col span={14}>
            <Description
              uaParsed={logContent?.uaParsed}
              ip={logContent?.ip}
              url={logContent?.request?.url}
              sdk={logContent?.sdk}
            />
            {logContent?.error?.values?.map((item: any) => {
              return <Stacktrace key={item.value + item.type} item={item} />;
            })}
          </Col>
          <Col span={10}>
            <Breadcrumbs breadcrumbs={logContent?.breadcrumbs} />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};
