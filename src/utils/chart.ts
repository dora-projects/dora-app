export enum FP_FCP_EVALUATE {
  Good = 1000,
  Me = 3000,
  Bad = 3000,
}

export enum LCP_EVALUATE {
  Good = 2500,
  Me = 4000,
  Bad = 4000,
}

export enum FID_EVALUATE {
  Good = 100,
  Me = 300,
  Bad = 300,
}

export enum CLS_EVALUATE {
  Good = 0.1,
  Me = 0.25,
  Bad = 0.25,
}

export enum EVALUATE_COLOR {
  Good = "#38AA43",
  Me = "#fac858",
  Bad = "#ee6666",
}

export const colorsPlate = ["#38AA43", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"];

export const colourData = (
  list: { key: number; doc_count: number }[],
  evaluate: { Good: number; Me: number; Bad: number }
) => {
  if (!Array.isArray(list)) return [];

  return list.map((i) => {
    const item = { ...i, itemStyle: { color: "" } };

    if (item["key"] < evaluate.Good) item.itemStyle.color = EVALUATE_COLOR.Good;
    if (item["key"] >= evaluate.Good && item["key"] <= evaluate.Me) item.itemStyle.color = EVALUATE_COLOR.Me;
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
    return `${(+value).toFixed(3)}ms`;
  }
  return `${(value / 1000).toFixed(3)}ms`;
};
