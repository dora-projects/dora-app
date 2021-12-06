import React from "react";
import ProCard, { StatisticCard } from "@ant-design/pro-card";
import { dateNowWithWeek } from "@/utils/date";
import { useParams } from "react-router-dom";
import FilterBar from "../../components/FilterBar";
import AlertLogs from "./AlertLogs";
import ErrorCount from "./ErrorCount";
import ErrorTrend from "./ErrorTrend";
import EventTrend from "./EventTrend";

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
          <StatisticCard title="事件趋势" chart={<EventTrend />} />
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
