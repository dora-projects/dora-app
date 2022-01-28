import React from "react";
import { Button, Popconfirm, Table } from "antd";
import ProCard from "@ant-design/pro-card";
import { useRequest } from "ahooks";
import { getUsers } from "@/services/user";
import { formatDate, formNow } from "@/utils/date";
import useUrlState from "@ahooksjs/use-url-state";

export const UserManage = () => {
  const { data } = useRequest(getUsers);
  const list = data?.data?.items || [];
  const total = data?.data?.total || 0;

  const [pagination, setPagination] = useUrlState({
    page: 1,
    limit: 10,
  });

  const columns = [
    {
      title: "姓名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render(t: string) {
        return formatDate(t);
      },
    },
    {
      title: "最后登录",
      dataIndex: "lastLoginAt",
      render(t: string) {
        return formNow(t);
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      render(id: number, row: any) {
        return (
          <>
            {row.role !== "admin" ? (
              <Button type="text" danger>
                删除
              </Button>
            ) : null}
          </>
        );
      },
    },
  ];

  return (
    <ProCard title="系统用户" headerBordered>
      <Table
        loading={false}
        rowKey={"id"}
        dataSource={list}
        columns={columns}
        pagination={{
          total: total,
          current: pagination.page,
          pageSize: pagination.limit,
        }}
        onChange={(p) => {
          const { current, pageSize } = p;
          setPagination({ ...pagination, page: current, limit: pageSize || 10 });
        }}
      />
    </ProCard>
  );
};
