import React from "react";
import ProCard from "@ant-design/pro-card";
import { Button, Empty } from "antd";
import { useRequest } from "ahooks";
import { PlusOutlined } from "@ant-design/icons";
import ProjectCardList from "./List";
import ManageDrawer from "./ManageDrawer";
import { getMyProjects } from "@/services/project";

const ProjectListPanel = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  const { data, loading, refresh } = useRequest(getMyProjects);
  const projectList = data?.data || [];

  return (
    <>
      <ProCard
        title="项目"
        bodyStyle={{ padding: "20px", minHeight: "500px" }}
        extra={
          <div>
            <Button icon={<PlusOutlined />} onClick={() => setDrawerVisible(true)}>
              新建项目
            </Button>
          </div>
        }
        loading={loading}
      >
        {projectList && projectList.length > 0 ? (
          <ProjectCardList
            projects={projectList}
            onClickSetting={(p) => {
              setEditItem(p);
              setDrawerVisible(true);
            }}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </ProCard>

      <ManageDrawer
        visible={drawerVisible}
        editItem={editItem}
        onOk={() => {
          setEditItem(null);
          setDrawerVisible(false);
          refresh();
        }}
        onClose={() => {
          setEditItem(null);
          setDrawerVisible(false);
        }}
      />
    </>
  );
};

export default ProjectListPanel;
