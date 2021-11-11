import { axios } from "@/common/axios";

export const getAlertList = (projectId: number) => {
  return axios.get("/manager/alert", { params: { projectId } });
};

export const createAlertRule = (data: {
  projectId: number;
  name: string;
  filter: {
    key: string;
    value: string;
  }[];
  thresholdsTime: number;
  thresholdsOperator: string;
  thresholdsQuota: number;
  silence: number;
}) => {
  return axios.put("/manager/alert/rule", data);
};

export const updateAlertRule = (data: {
  id: number;
  projectId: number;
  name: string;
  filter: {
    key: string;
    value: string;
  }[];
  thresholdsTime: number;
  thresholdsOperator: string;
  thresholdsQuota: number;
  silence: number;
}) => {
  return axios.post("/manager/alert/rule", data);
};

export const toggleAlertRule = (data: { ruleId: number; open: boolean }) => {
  return axios.post("/manager/alert/rule/toggle", data);
};

export const deleteAlertRule = (ruleId: number) => {
  return axios.delete("/manager/alert/rule", { params: { ruleId } });
};

export const getAlertContact = (id: number) => {
  return axios.get("/manager/alert/contact", { params: { id } });
};

export const addAlertContact = (data: { ruleId: number; userId: number }) => {
  return axios.put("/manager/alert/contact", data);
};

export const deleteAlertContact = (contactId: number) => {
  return axios.delete("/manager/alert/contact", { params: { contactId } });
};
