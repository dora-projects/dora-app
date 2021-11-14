import { axios } from "@/common/axios";

interface IssuesItem {
  id: number;
  fingerprint: string;
  appKey: string;
  type: string;
  total: number;
  value: string;
  url: string;
  release: string;
  environment: string;
  recently: string;
  createdAt: string;
}

export const getIssues = (params: {
  appKey: string;
  page?: number;
  limit?: number;
  release?: string;
  environment?: string;
  from: number;
  to: number;
}): Promise<{
  data: ListPages<IssuesItem>;
}> => {
  return axios.get("/manager/issues", { params });
};
