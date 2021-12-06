import React from "react";
import { useRequest } from "ahooks";
import { StatisticCard } from "@ant-design/pro-card";
import EChartsForReact from "@/components/EChartsForReact";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useFilterStore } from "@/pages/projects/store/filterBar";
import { queryTrend } from "@/services/analysis";

export const getAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => i[key]);
};

export const getTsAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => dayjs(i[key]).format("YYYY-MM-DD HH:mm:ss"));
};

const ErrorTrend = () => {
  const params = useParams();
  const appKey = params.appKey;
  const { value: filterValue } = useFilterStore();
  const { data: trendData, run } = useRequest(queryTrend, {
    manual: true,
  });

  React.useEffect(() => {
    if (filterValue) {
      run({
        appKey,
        type: "error",
        environment: filterValue.environment,
        release: filterValue.release,
        from: filterValue.from,
        to: filterValue.to,
        interval: "10m",
      }).then((r) => {});
    }
  }, [run, filterValue, appKey]);

  const buckets = trendData?.data;
  const xAxisData = getAxisData(buckets, "key_as_string");
  const yAxisData = getAxisData(buckets, "doc_count");

  return (
    <EChartsForReact
      option={{
        title: {
          show: false,
        },
        color: ["#ee6666", "#3b82fe", "#91cc75", "#fac858", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
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
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            stack: "Total",
          },
        ],
      }}
    />
  );
};

export default ErrorTrend;
