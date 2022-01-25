import React from "react";
import { useRequest } from "ahooks";
import dayjs from "@/utils/date";
import { Card, Switch, Space } from "antd";
import { Spin, Row, Col, Button, PageHeader, Statistic } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterStore } from "@/stores";
import Stacktrace from "./components/Stacktrace";
import Breadcrumbs from "./components/Breadcrumbs";
import Description from "./components/Description";
import { queryLogs } from "@/services/analysis";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { appKey, fingerprint } = params;
  const { value: filterValue } = useFilterStore();
  const [curIndex, setShowIndex] = React.useState(0);

  const { run, data, loading } = useRequest(queryLogs, { manual: true });

  React.useEffect(() => {
    if (filterValue) {
      run({
        appKey,
        fingerprint,
        environment: filterValue.environment,
        release: filterValue.release,
        from: filterValue.from,
        to: filterValue.to,
        size: 999,
      }).then((r) => {});
    }
  }, [run, filterValue, appKey, fingerprint]);

  const hits = data?.data?.hits;
  const total = hits?.length;

  const logContent = React.useMemo(() => {
    if (hits && hits.length > 0) {
      return hits[curIndex]?._source;
    }
    return null;
  }, [hits, curIndex]);

  const handleBeforeNext = React.useCallback(
    (type) => {
      if (type === "last") {
        if (curIndex === 0) return;
        setShowIndex(curIndex + -1);
      }
      if (type === "next") {
        const next = curIndex + 1;
        if (next === total) return;
        setShowIndex(next);
      }
    },
    [total, curIndex, setShowIndex]
  );

  console.log(logContent);

  return (
    <div style={{ padding: "20px" }}>
      <Spin spinning={loading}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <PageHeader
              ghost={false}
              title="详情"
              subTitle={`event_id: ${logContent?.event_id}`}
              onBack={() => {
                navigate(-1);
              }}
            >
              <Row align="middle" gutter={[20, 20]}>
                <Col span={3}>
                  <Statistic title="环境" value={logContent?.environment} />
                </Col>
                <Col span={3}>
                  <Statistic title="版本" value={logContent?.release} />
                </Col>
                <Col span={3}>
                  <Statistic title="发生总次数" value={total} />
                </Col>
                <Col span={3}>
                  <Statistic title="当前第几条" value={curIndex + 1} />
                </Col>
                <Col span={6}>
                  <h3>{dayjs(logContent?.timestamp).format("YYYY/MM/DD HH:mm:ss")}</h3>
                  <div style={{ color: "#666", fontSize: "14px" }}>{dayjs(logContent?.timestamp).fromNow()}</div>
                </Col>
                <Col span={6}>
                  <Space>
                    <Button disabled={curIndex === 0} onClick={() => handleBeforeNext("last")}>
                      上一条
                    </Button>
                    <Button disabled={curIndex + 1 === total} onClick={() => handleBeforeNext("next")}>
                      下一条
                    </Button>
                  </Space>
                </Col>
              </Row>
            </PageHeader>
          </Col>
          <Col span={14}>
            <Description
              uaParsed={logContent?.uaParsed}
              ip={logContent?.ip}
              url={logContent?.request?.url}
              sdk={logContent?.sdk}
            />
            {logContent?.error?.values?.map((item: any) => {
              return <Stacktrace key={item.value} item={item} />;
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

export default Detail;
