import { axios } from "@/common/axios";

export const getQueueCount = () => {
  return axios.get("/manager/system/bull/counts");
};

export const getEsStatus = () => {
  return axios.get("/manager/system/elastic/stats");
};
