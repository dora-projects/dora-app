import React from "react";
import { useRequest } from "ahooks";
import { StatisticCard } from "@ant-design/pro-card";
import { queryByEql } from "@/services/analysis";
import EChartsForReact from "@/components/EChartsForReact";
import { useSettingStore } from "@/stores/setting";
import { queryErrorCount, queryErrorTrend } from "@/eql";
import dayjs from "dayjs";

export const getAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => i[key]);
};

export const getTsAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => dayjs(i[key]).format("YYYY-MM-DD HH:mm:ss"));
};

const ErrorTrend = () => {
  const appKey = useSettingStore((state) => state.project?.appKey);

  const from = dayjs().startOf("date").valueOf();
  const to = dayjs().valueOf();

  const { data: trendData } = useRequest(() => queryByEql({ eql: queryErrorTrend(appKey!, from, to, 10) }), {
    ready: !!appKey,
  });

  const buckets = trendData?.data?.aggregations?.trend?.buckets;
  const xAxisData = getTsAxisData(buckets, "key");
  const yAxisData = getAxisData(buckets, "doc_count");

  return (
    <EChartsForReact
      option={{
        title: {
          show: false,
        },
        color: ["#3b82fe", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
        grid: {
          left: 40,
          right: 40,
          top: 40,
          bottom: 40,
        },
        legend: {
          padding: 10,
          icon: "roundRect",
          right: 20,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: yAxisData,
            type: "line",
          },
        ],
      }}
    />
  );
};

export default ErrorTrend;
