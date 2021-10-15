import { safeJsonParser } from "@/utils/helper";

const storagePrefix = "dora_app";

const storage = {
  getToken: () => {
    const token = window.localStorage.getItem(`${storagePrefix}_token`);
    return safeJsonParser(token as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}_token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}_token`);
  },
};

export default storage;
