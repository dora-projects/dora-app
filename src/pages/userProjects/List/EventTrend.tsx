import React from "react";
import { useRequest } from "ahooks";
import EChartsForReact, { EChartsOption } from "@/components/EChartsForReact";
import { queryTrend } from "@/services/analysis";
import { colorsPlateCommon, getAxisData, getTsAxisDataFormat, last24hours } from "@/utils/chart";

interface Props {
  appKey: string;
}

const EventTrend = (props: Props) => {
  const {
    data: trendData,
    run,
    loading,
  } = useRequest(queryTrend, {
    manual: true,
  });

  React.useEffect(() => {
    const [from, to] = last24hours();
    run({
      appKey: props.appKey,
      from,
      to,
      interval: "10m",
    });
  }, [run, props.appKey]);

  const buckets = trendData?.data;

  const option: EChartsOption = React.useMemo(() => {
    if (buckets && buckets.length > 0) {
      const xAxisData = getTsAxisDataFormat(buckets, "key_as_string", "HH:mm");
      const yAxisData = getAxisData(buckets, "doc_count");
      return {
        title: {
          show: false,
        },
        color: colorsPlateCommon,
        grid: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 25,
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
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            fontSize: 10,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: false,
        },
        series: [
          {
            data: yAxisData,
            type: "line",
            symbol: "none",
            areaStyle: {},
          },
        ],
      };
    } else {
      return {
        title: {
          text: "暂无数据",
          left: "center",
          top: "center",
          textStyle: {
            color: "#CCC",
            fontSize: 16,
            fontWeight: 400,
          },
        },
      };
    }
  }, [buckets]);

  return (
    <EChartsForReact
      style={{ width: "100%", height: 150 }}
      loadingOption={{ text: "加载中..." }}
      showLoading={loading}
      option={option}
    />
  );
};

export default EventTrend;
