import React from "react";
import { colorsPlate, getAxisData, getYAxisData, labelFormatter } from "@/utils/chart";
import EChartsForReact from "@/components/EChartsForReact";

const Histogram = (props: { data: any[] }) => {
  const xAxisData = getAxisData(props.data, "key");
  const yAxisData = getYAxisData(props.data, "doc_count");

  return (
    <EChartsForReact
      style={{
        height: 150,
      }}
      option={{
        title: {
          show: false,
        },
        color: colorsPlate,
        grid: {
          left: 40,
          right: 40,
          top: 20,
          bottom: 20,
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
            formatter: labelFormatter,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: yAxisData,
            type: "bar",
          },
        ],
      }}
    />
  );
};

export default Histogram;
