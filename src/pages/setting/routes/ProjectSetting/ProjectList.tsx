import React from "react";
import { Table, Button, Space } from "antd";
import { useProjectsStore } from "@/stores/projects";
import { useNavigate } from "react-router-dom";
import ProCard from "@ant-design/pro-card";

const ProjectList = () => {
  const navigate = useNavigate();
  const { loading, projects } = useProjectsStore();

  const columns = [
    {
      title: "appKey",
      dataIndex: "appKey",
      width: 200,
    },
    {
      title: " 类型",
      dataIndex: "type",
    },
    {
      title: "名字",
      dataIndex: "name",
    },
    {
      title: "描述",
      dataIndex: "detail",
    },
    {
      title: "创建于",
      dataIndex: "createdAt",
    },
    {
      title: "操作",
      dataIndex: "appKey",
      render(appKey: string) {
        return (
          <Space>
            <Button
              type="link"
              style={{ padding: "0" }}
              onClick={() => {
                navigate(`/setting/projects/${appKey}/info`);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              style={{ padding: "0" }}
              onClick={() => {
                navigate(`/setting/projects/${appKey}/member`);
              }}
            >
              查看成员
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <ProCard title="项目列表" headerBordered>
      <Table loading={loading} dataSource={projects || []} rowKey="id" columns={columns} />
    </ProCard>
  );
};

export default ProjectList;
