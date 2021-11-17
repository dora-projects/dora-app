import { axios } from "@/common/axios";

export const queryByEql = (data: { eql: Record<string, any> }) => {
  return axios.post("/manager/analysis/eql", data);
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
