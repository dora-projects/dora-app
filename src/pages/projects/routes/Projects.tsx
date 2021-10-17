import { Button } from "antd";
import ProCard from "@ant-design/pro-card";
import { PageContainer } from "@ant-design/pro-layout";
import React from "react";
import TeamList from "../components/TeamList";
import ProjectCardView from "../components/ProjectCardView";
import { Project } from "@/pages/projects/components/type";

const listData: Project[] = [
  {
    _id: "123123",
    name: "哈哈哈",
    description: "",
  },
  { _id: "123123", name: "哈哈哈", description: "" },
];

export const Projects = () => {
  return (
    <PageContainer onTabChange={(tab) => {}}>
      <ProCard split="vertical">
        <ProCard colSpan="30%" bodyStyle={{ padding: "10px 0" }}>
          <TeamList />
        </ProCard>
        <ProCard title="我的团队" headerBordered>
          <ProjectCardView onCreateProject={() => {}} projects={listData} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
