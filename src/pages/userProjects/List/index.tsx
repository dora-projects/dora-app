import React from "react";
import { useNavigate } from "react-router-dom";
import ProCard from "@ant-design/pro-card";
import { Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CardList from "./CardList";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store";

export const UserProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { loading, projects } = useSelector((state: RootState) => ({
    projects: state.projectList,
    loading: state.loading.models.projectList.loading,
  }));

  React.useEffect(() => {
    dispatch.projectList.fetchUserProjects();
  }, [dispatch]);

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
        <CardList
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
