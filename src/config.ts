console.log(import.meta.env);
console.log(process.env.NODE_ENV);

export const IS_PREVIEW_SITE = window.location.host === "dora.nancode.cn";

export const API_URL = import.meta.env.VITE_APP_API_URL as string;

export const __DEV__ = import.meta.env.DEV;
export const __PROD__ = import.meta.env.MODE === "production";
export const __TEST__ = import.meta.env.MODE === "test";
