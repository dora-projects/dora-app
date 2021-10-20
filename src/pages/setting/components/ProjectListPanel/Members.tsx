import { Table, Avatar, Button, Space } from "antd";
import { Popconfirm, message, Select } from "antd";
import { useRequest } from "ahooks";
import { addProjectUsers, removeProjectUsers, getProjectUsers } from "@/services/project";
import UserSelect from "./UserSelect";
import React from "react";

interface Props {
  projectId: number;
}

const Members = (props: Props) => {
  const [selectUser, setSelectUsers] = React.useState<number[]>([]);

  const { data, loading, refresh } = useRequest(() => getProjectUsers({ projectId: props.projectId }), {
    ready: !!props.projectId,
    refreshDeps: [props.projectId],
  });
  const dataSource = data?.data || [];

  const { run: runAddProjectUsers } = useRequest((d: FuncFirstArgType<typeof addProjectUsers>) => addProjectUsers(d), {
    manual: true,
    onSuccess() {
      setSelectUsers([]);
      return refresh();
    },
  });

  const { run: runRemoveProjectUsers } = useRequest(
    (d: FuncFirstArgType<typeof removeProjectUsers>) => removeProjectUsers(d),
    {
      manual: true,
      onSuccess() {
        return refresh();
      },
    }
  );

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
                  userIds: [id],
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
