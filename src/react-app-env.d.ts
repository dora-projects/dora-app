/// <reference types="react-scripts" />

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

declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare interface IPaginationMeta extends ObjectLiteral {
  itemCount: number;
  totalItems?: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
}

declare class ListPages<PaginationObject, T extends ObjectLiteral = IPaginationMeta> {
  readonly items: PaginationObject[];
  readonly meta: T;
  constructor(items: PaginationObject[], meta: T);
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
  appKey?: string;
  release?: string;
  environment?: string;
}
