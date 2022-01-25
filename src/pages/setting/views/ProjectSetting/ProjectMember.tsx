import React from "react";
import ProCard from "@ant-design/pro-card";
import { Table, Avatar, Button, Space } from "antd";
import { Popconfirm, message, Tag } from "antd";
import { useRequest } from "ahooks";
import { addProjectUsers, removeProjectUsers, getProjectUsers, getProject } from "@/services/project";
import UserSelect from "@/components/UserSelect";
import { useLoginUserStore } from "@/stores/user";
import { useParams } from "react-router-dom";

const ProjectMember = () => {
  const params = useParams();

  const { data: info } = useRequest(() => getProject({ appKey: params?.appKey }), {
    refreshDeps: [params?.appKey],
    ready: !!params?.appKey,
  });
  const projectInfo: Project = info?.data;

  const { userInfo } = useLoginUserStore();

  const [selectUser, setSelectUsers] = React.useState<number[]>([]);

  const { data, loading, refresh } = useRequest(() => getProjectUsers({ projectId: projectInfo?.id }), {
    ready: !!projectInfo?.id,
    refreshDeps: [projectInfo?.id],
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
        const { user_projects } = row;
        if (user_projects && user_projects.length > 0) {
          return user_projects[0].prole;
        }
        return "";
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      render(id: number, row: any) {
        let role = "";
        const { user_projects } = row;
        if (user_projects && user_projects.length > 0) {
          role = user_projects[0].prole;
        }

        return (
          <>
            {role !== "owner" ? (
              <Popconfirm
                title="你确定移除该成员吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  runRemoveProjectUsers({
                    projectId: projectInfo?.id,
                    userId: id,
                  });
                }}
              >
                <Button type="text" danger>
                  移除
                </Button>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];

  return (
    <ProCard title={`成员-${projectInfo?.name}`} headerBordered>
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
            runAddProjectUsers({ projectId: projectInfo?.id, userIds: selectUser });
          }}
        >
          添加成员
        </Button>
      </Space>
      <Table loading={loading} rowKey={"id"} dataSource={dataSource} columns={columns} />
    </ProCard>
  );
};

export default ProjectMember;
