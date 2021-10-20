import React from "react";
import ProCard from "@ant-design/pro-card";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProjectCardList from "./List";
import ManageDrawer from "./ManageDrawer";

const projectList = [
  {
    id: 1,
    name: "ddddd",
    desc: "ddddddddd",
  },
  {
    id: 2,
    name: "dd23 东add东add东add东add",
    desc: "212",
  },
  {
    id: 3,
    name: "dd23 东add东add东add东add",
    desc: "212",
  },
  {
    id: 4,
    name: "dd23 东add东add东add东add",
    desc: "212",
  },
];

const ProjectListPanel = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  return (
    <>
      <ProCard
        title="项目"
        bodyStyle={{ padding: "20px" }}
        extra={
          <div>
            <Button icon={<PlusOutlined />} onClick={() => setDrawerVisible(true)}>
              新建项目
            </Button>
          </div>
        }
      >
        <ProjectCardList
          projects={projectList}
          onClickSetting={(p) => {
            setEditItem(p);
            setDrawerVisible(true);
          }}
        />
      </ProCard>

      <ManageDrawer
        visible={drawerVisible}
        editItem={editItem}
        onOk={() => {
          setEditItem(null);
          setDrawerVisible(false);
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
