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

type FuncFirstArgType<T extends (...args: any) => any> = Parameters<T>[0];
