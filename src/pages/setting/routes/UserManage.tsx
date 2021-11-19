import React from "react";
import { Button, Popconfirm, Table } from "antd";
import ProCard from "@ant-design/pro-card";
import { useRequest } from "ahooks";
import { getUsers } from "@/services/user";
import dayjs from "dayjs";

const UserManage = () => {
  const { data } = useRequest(getUsers);
  const list = data?.data?.items || [];
  console.log(data);

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
        return dayjs(t).format("YYYY-MM-DD HH:mm:ss");
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
    <ProCard>
      <Table loading={false} rowKey={"id"} dataSource={list} columns={columns} />
    </ProCard>
  );
};

export default UserManage;
