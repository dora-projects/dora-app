import React from "react";
import { Table, Avatar, Button, Space } from "antd";
import { Popconfirm, message, Tag } from "antd";
import { useRequest } from "ahooks";
import { addProjectUsers, removeProjectUsers, getProjectUsers } from "@/services/project";
import UserSelect from "@/components/UserSelect";
import { useLoginUserStore } from "@/stores/user";

interface Props {
  projectId: number;
}

const Members = (props: Props) => {
  const { userInfo } = useLoginUserStore();
  const [selectUser, setSelectUsers] = React.useState<number[]>([]);

  const { data, loading, refresh } = useRequest(() => getProjectUsers({ projectId: props.projectId }), {
    ready: !!props.projectId,
    refreshDeps: [props.projectId],
  });
  const dataSource = data?.data || [];

  const { run: runAddProjectUsers } = useRequest(addProjectUsers, {
    manual: true,
    onSuccess() {
      setSelectUsers([]);
      return refresh();
    },
  });

  const { run: runRemoveProjectUsers } = useRequest(removeProjectUsers, {
    manual: true,
    onSuccess() {
      return refresh();
    },
  });

  const columns = [
    {
      title: "姓名",
      dataIndex: "username",
      render(username: string, row: any) {
        if (userInfo?.id === row?.id) {
          return (
            <div>
              {username} <Tag color="#87d068">本账号</Tag>
            </div>
          );
        }
        return username;
      },
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "项目角色",
      dataIndex: "id",
      render(id: number, row: any) {
        const { projectRoles } = row;
        if (projectRoles && projectRoles.length > 0) {
          return projectRoles[0].projectRole;
        }
        return "";
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      render(id: number) {
        return (
          <>
            <Popconfirm
              title="你确定移除该成员吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                runRemoveProjectUsers({
                  projectId: props.projectId,
                  userId: id,
                });
              }}
            >
              <Button type="text" danger>
                移除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Space size={"middle"} style={{ marginBottom: "20px" }}>
        <UserSelect
          value={selectUser}
          onChange={(v) => {
            setSelectUsers(v);
          }}
        />
        <Button
          disabled={selectUser.length <= 0}
          onClick={() => {
            runAddProjectUsers({ projectId: props.projectId, userIds: selectUser });
          }}
        >
          添加成员
        </Button>
      </Space>
      <Table loading={loading} rowKey={"id"} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Members;
