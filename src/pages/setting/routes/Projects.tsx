import { Button } from "antd";
import ProCard from "@ant-design/pro-card";
import { PageContainer } from "@ant-design/pro-layout";
import React from "react";
import TeamList from "../components/TeamList";
import ProjectCardList from "../components/ProjectCardList";

const listData: any[] = [
  {
    id: "123123",
    name: "哈哈哈",
  },
  {
    _id: "123123",
    name: "哈哈哈",
  },
];

const Projects = () => {
  return (
    <ProCard split="vertical">
      <ProCard
        colSpan="30%"
        title="我的团队"
        headerBordered
        bodyStyle={{ padding: "0" }}
        style={{ minHeight: "500px" }}
        extra={
          <div>
            <Button>新建</Button>
          </div>
        }
      >
        <TeamList teams={listData} />
      </ProCard>
      <ProCard
        title="项目"
        headerBordered
        style={{ minHeight: "500px" }}
        extra={
          <div>
            <Button>新建</Button>
          </div>
        }
      >
        <ProjectCardList />
      </ProCard>
    </ProCard>
  );
};

export default Projects;
