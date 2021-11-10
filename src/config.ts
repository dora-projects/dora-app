export const IS_PREVIEW_SITE = window.location.host === "dora.nancode.cn";
export const API_URL = process.env.REACT_APP_API_URL as string;

export const __DEV__ = process.env.NODE_ENV === "development";
export const __PROD__ = process.env.NODE_ENV === "production";
export const __TEST__ = process.env.NODE_ENV === "test";
