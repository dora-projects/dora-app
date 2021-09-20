import { HeartOutlined } from "@ant-design/icons";
import * as React from "react";

export default [
  {
    path: "/home",
    name: "首页",
    icon: <HeartOutlined />,
    children: [
      {
        path: "/home/overview",
        name: "概述",
        hideInMenu: true,
        icon: <HeartOutlined />,
      },
      {
        path: "/home/search",
        name: "搜索",
        hideInMenu: true,
        icon: <HeartOutlined />,
      },
    ],
  },
  {
    path: "/data_hui",
    name: "汇总数据",
    icon: <HeartOutlined />,
    children: [
      {
        collapsed: true,
        menuName: "域买家维度交易",
        name: "域买家维度交易",
        children: [
          {
            id: 2,
            name: "月表",
            path: "/data_hui2",
          },
          {
            name: "日表",
            path: "/data_hui3?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk",
          },
        ],
      },
      {
        name: "维度交易",
        path: "/",
        icon: <HeartOutlined />,
        children: [
          {
            name: "月表",
            path: "/data_hui4",
          },
          {
            name: "日表",
            key: "tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk",
            path: "/data_hui5",
          },
        ],
      },
    ],
  },
  {
    path: "/data_ming",
    name: "明细数据",
    icon: <HeartOutlined />,
    children: [
      {
        path: "/other/outLoadMenu",
        name: "菜单导出",
        hideInMenu: true,
      },
      {
        path: "/other/homeEdit",
        name: "概述导出",
      },
    ],
  },
  {
    path: "/other",
    name: "其他",
    icon: <HeartOutlined />,
    children: [
      {
        path: "/other/upLoad",
        name: "odps同步导入",
      },
      {
        path: "/other/upLoadMenu",
        name: "菜单导入",
      },
      {
        path: "/other/homeEdit",
        name: "概述编辑",
        hideInMenu: true,
      },
    ],
  },
];
