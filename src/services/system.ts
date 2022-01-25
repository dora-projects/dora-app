import { axios } from "@/utils/axios";

export const getQueueCount = () => {
  return axios.get("/manager/system/bull/counts");
};

export const getEsStatus = () => {
  return axios.get("/manager/system/elastic/stats");
};
