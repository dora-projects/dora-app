/// <reference types="vite/client" />

declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare interface ListPages<T> {
  items: T[];
  limit: number;
  page: number;
  total: number;
}

interface TrendRangeParams {
  from: number;
  to: number;
  interval: string;
}

interface RangeParams {
  from?: number;
  to?: number;
}

interface CommonParams {
  size?: number;
  appKey?: string;
  type?: string;
  release?: string;
  environment?: string;
  fingerprint?: string;
}

interface Project {
  id: number;
  appKey: string;
  type: string;
  name: string;
  detail: string;
}
