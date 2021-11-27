import React from "react";
import ProCard, { StatisticCard } from "@ant-design/pro-card";
import { dateNowWithWeek } from "@/utils/date";
import { useParams } from "react-router-dom";
import FilterBar from "../../components/FilterBar";
import AlertLogs from "./AlertLogs";
import ErrorCount from "./ErrorCount";
import ErrorTrend from "./ErrorTrend";

const Overview = () => {
  const params = useParams();
  const appKey = params.appKey;
  const dateNow = dateNowWithWeek();

  const responsive = false;
  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <ProCard
        title="数据概览"
        extra={`${dateNow}`}
        split={responsive ? "horizontal" : "vertical"}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: "访问量",
                  value: 0,
                  // description: <Statistic title="较昨天" value="8.04%" trend="up" />,
                }}
              />
              <ErrorCount />
            </ProCard>
          </ProCard>
          <StatisticCard title="错误趋势" chart={<ErrorTrend />} />
        </ProCard>
        <StatisticCard
          title="告警日志"
          chart={
            <>
              <AlertLogs />
            </>
          }
        />
      </ProCard>
    </div>
  );
};

export default Overview;
