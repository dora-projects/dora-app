import React from "react";
import ProCard, { StatisticCard } from "@ant-design/pro-card";
import { dateNowWithWeek } from "@/utils/date";
import { useParams } from "react-router-dom";
import FilterBar from "@/components/FilterBar";
import LogPanel from "./LogPanel";
import AlertLogs from "./AlertLogs";
import ErrorTrend from "./ErrorTrend";
import EventTrend from "./EventTrend";
import useUrlState from "@ahooksjs/use-url-state";
import moment from "moment";

export const Overview = () => {
  const [filterVal, setFilters] = useUrlState(
    {
      release: null,
      environment: null,
      tag: "today",
      from: moment().startOf("day").valueOf(),
      to: moment().valueOf(),
    },
    {
      navigateMode: "replace",
      parseOptions: { parseNumbers: true },
    }
  );

  const dateNow = dateNowWithWeek();
  const responsive = false;

  return (
    <div style={{ padding: "20px" }}>
      <FilterBar
        value={filterVal}
        onChange={(v) => {
          setFilters(v);
        }}
      />
      <ProCard
        title="数据概览"
        extra={`${dateNow}`}
        split={responsive ? "horizontal" : "vertical"}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <StatisticCard title="事件趋势" chart={<EventTrend {...filterVal} />} />
          <StatisticCard title="错误趋势" chart={<ErrorTrend {...filterVal} />} />
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
      <LogPanel />
    </div>
  );
};
