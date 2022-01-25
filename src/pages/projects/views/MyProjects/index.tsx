import React from "react";
import { useNavigate } from "react-router-dom";
import ProCard from "@ant-design/pro-card";
import { Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProjectCardList from "./List";
import { useMyProjectListStore } from "@/stores";

const ProjectListPanel = () => {
  const navigate = useNavigate();
  const { loading, projects, fetchMyProjects } = useMyProjectListStore();

  React.useEffect(() => {
    fetchMyProjects().then((r) => {});
  }, [fetchMyProjects]);

  return (
    <ProCard
      title="项目"
      bodyStyle={{ padding: "20px", minHeight: "500px" }}
      extra={
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              navigate("/projects/create");
            }}
          >
            新建项目
          </Button>
        </div>
      }
      loading={loading}
    >
      {projects && projects.length > 0 ? (
        <ProjectCardList
          projects={projects}
          onClickSetting={(p) => {
            navigate(`/setting/projects/${p.appKey}`);
          }}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </ProCard>
  );
};

export default ProjectListPanel;
