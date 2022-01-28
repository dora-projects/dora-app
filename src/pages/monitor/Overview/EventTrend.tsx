import React from "react";
import { useRequest } from "ahooks";
import EChartsForReact from "@/components/EChartsForReact";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { queryTrend } from "@/services/analysis";

export const getAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => i[key]);
};

export const getTsAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => dayjs(i[key]).format("YYYY-MM-DD HH:mm:ss"));
};

const ErrorTrend = (props: UrlFilter) => {
  const params = useParams();
  const appKey = params.appKey;

  const {
    data: trendData,
    run,
    loading,
  } = useRequest(queryTrend, {
    manual: true,
  });

  React.useEffect(() => {
    run({
      appKey,
      environment: props.environment,
      release: props.release,
      from: props.from,
      to: props.to,
      interval: "10m",
    });
  }, [run, appKey, props.environment, props.release, props.from, props.to]);

  const buckets = trendData?.data;
  const xAxisData = getAxisData(buckets, "key_as_string");
  const yAxisData = getAxisData(buckets, "doc_count");

  return (
    <EChartsForReact
      showLoading={loading}
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
