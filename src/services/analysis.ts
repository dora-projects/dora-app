import { axios } from "@/common/axios";

export const queryLogs = (params: RangeParams & CommonParams) => {
  return axios.get("/manager/analysis/logs", { params });
};

export const queryCount = (params: RangeParams & CommonParams) => {
  return axios.get("/manager/analysis/event/count", { params });
};

export const queryTrend = (params: TrendRangeParams & CommonParams) => {
  return axios.get("/manager/analysis/event/trend", { params });
};

export const queryEventFiledCountList = (params: { field: string } & RangeParams & CommonParams) => {
  return axios.get("/manager/analysis/filed/count/list", { params });
};

export const queryFiledOptions = (params: { field: string; appKey: string }) => {
  return axios.get("/manager/analysis/filed/options", { params });
};

export const queryWebVitalsRange = (params: RangeParams & CommonParams) => {
  return axios.get("/manager/analysis/web_vitals/range", { params });
};

export const queryWebVitalsPercentiles = (params: RangeParams & CommonParams) => {
  return axios.get("/manager/analysis/web_vitals/percentiles", { params });
};

export const queryWebVitalsHistogram = (params: RangeParams & CommonParams) => {
  return axios.get("/manager/analysis/web_vitals/histogram", { params });
};
