import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import storage from "@/utils/storage";
import { useNotificationStore } from "@/stores/notifications";
import { debounce } from "lodash-es";

const debounceAddNotification = debounce(
  (message) => {
    useNotificationStore.getState().addNotification({
      type: "error",
      title: message,
    });
  },
  100,
  {
    leading: true,
  }
);

const debounceGoLogin = debounce(
  () => {
    window.location.href = "/auth/login";
  },
  180,
  {
    leading: false,
  }
);

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
    const status = error.response?.status;
    const message = error.response?.data?.error?.message || error.message;

    // 未登录跳转
    if (status === 401) {
      debounceGoLogin();
    }

    // 未登录错误 不提示
    if (status !== 401) {
      debounceAddNotification(message);
    }

    return Promise.reject(error);
  }
);
