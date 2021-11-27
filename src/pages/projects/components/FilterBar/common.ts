import moment, { Moment } from "moment";

export const getTodayRange = () => [moment().startOf("day"), moment()];

interface timeTag {
  label: string;
  value: string;
  range: () => Moment[];
}

export const timeList: timeTag[] = [
  {
    label: "昨天",
    value: "yesterday",
    range: () => [moment().add(-1, "day").startOf("day"), moment().add(-1, "day").endOf("day")],
  },
  {
    label: "1小时",
    value: "last_one_hour",
    range: () => [moment().add(-1, "hour"), moment()],
  },
  {
    label: "6小时",
    value: "last_six_hour",
    range: () => [moment().add(-6, "hour"), moment()],
  },
  {
    label: "今天",
    value: "today",
    range: getTodayRange,
  },

  {
    label: "最近3天",
    value: "3d",
    range: () => [moment().add(-3, "day").startOf("day"), moment()],
  },
  {
    label: "最近7天",
    value: "7d",
    range: () => [moment().add(-7, "day").startOf("day"), moment()],
  },
];
