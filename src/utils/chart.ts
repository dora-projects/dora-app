import { toFixedNum } from "@/utils/helper";
import dayjs from "dayjs";

export enum FP_FCP_EVALUATE {
  Good = 1000,
  Meh = 3000,
  Bad = 3000,
}

export enum LCP_EVALUATE {
  Good = 2500,
  Meh = 4000,
  Bad = 4000,
}

export enum FID_EVALUATE {
  Good = 100,
  Meh = 300,
  Bad = 300,
}

export enum CLS_EVALUATE {
  Good = 0.1,
  Meh = 0.25,
  Bad = 0.25,
}

export enum EVALUATE_COLOR {
  Good = "#38AA43",
  Meh = "#fac858",
  Bad = "#ee6666",
}

export const colorsPlate = ["#38AA43", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"];

export const colorsPlateCommon = [
  "#3b82fe",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];

export const colourData = (
  list: { key: number; doc_count: number }[],
  evaluate: { Good: number; Meh: number; Bad: number }
) => {
  if (!Array.isArray(list)) return [];

  return list.map((i) => {
    const item = { ...i, itemStyle: { color: "" } };

    if (item["key"] < evaluate.Good) item.itemStyle.color = EVALUATE_COLOR.Good;
    if (item["key"] >= evaluate.Good && item["key"] <= evaluate.Meh) item.itemStyle.color = EVALUATE_COLOR.Meh;
    if (item["key"] > evaluate.Bad) item.itemStyle.color = EVALUATE_COLOR.Bad;

    return item;
  });
};

export const getAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => i[key]);
};

export const getYAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => ({
    value: i[key],
    itemStyle: i.itemStyle,
  }));
};

export const labelFormatter = (value: number) => {
  if (value < 1000) {
    return `${toFixedNum(value, 3)}ms`;
  }
  return `${toFixedNum(value / 1000, 3)}ms`;
};

export const getTsAxisData = (list: any[], key: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => dayjs(i[key]).format("YYYY-MM-DD HH:mm:ss"));
};

export const getTsAxisDataFormat = (list: any[], key: string, format: string) => {
  if (!Array.isArray(list)) return [];
  return list.map((i) => dayjs(i[key]).format(format));
};

export const last24hours = () => {
  return [dayjs().subtract(24, "h").valueOf(), dayjs().valueOf()];
};
