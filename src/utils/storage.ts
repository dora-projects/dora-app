import { safeJsonParser } from "@/utils/helper";

const storagePrefix = "dora_app";

const localStore = window.localStorage;
const sessionStore = window.sessionStorage;

const storage = {
  /**
   * 保存登录 token
   */
  getToken: () => {
    const token = localStore.getItem(`${storagePrefix}_token`);
    return safeJsonParser(token as string);
  },
  setToken: (token: string) => {
    localStore.setItem(`${storagePrefix}_token`, JSON.stringify(token));
  },
  clearToken: () => {
    localStore.removeItem(`${storagePrefix}_token`);
  },

  /**
   * 记录跳转返回路径
   */
  setBackUrl: (path: string) => {
    sessionStore.setItem(`${storagePrefix}_back_url`, path);
  },
  getBackUrl: () => {
    const url = sessionStore.getItem(`${storagePrefix}_back_url`);
    sessionStore.removeItem(`${storagePrefix}_back_url`);
    return url;
  },
};

export default storage;
