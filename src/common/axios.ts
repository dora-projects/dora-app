import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import storage from "@/utils/storage";
import { useNotificationStore } from "@/stores/notifications";

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    useNotificationStore.getState().addNotification({
      type: "error",
      title: message,
    });

    return Promise.reject(error);
  }
);
