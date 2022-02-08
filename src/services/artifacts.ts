import { axios } from "@/utils/axios";

export interface Artifact {
  id: number;

  [key: string]: any;
}

export const getArtifact = (params: {
  appKey: string;
  page?: number;
  limit?: number;
}): Promise<{
  data: ListPages<Artifact>;
}> => {
  return axios.get("/manager/artifacts", { params });
};

export const getArtifactPreview = (params: { artifactId: number }): Promise<any> => {
  return axios.get("/manager/artifact/preview", { params });
};
