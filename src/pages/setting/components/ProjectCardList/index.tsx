import React from "react";
import { ProjectItem } from "./index.styled";
import { Col, Row } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import IconFont from "@/components/IconFont";

const ProjectCardList = () => {
  const projectList = [
    {
      name: "ddddd",
      desc: "ddddddddd",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
    {
      name: "dd23 东add东add东add东add",
      desc: "212",
    },
  ];
  return (
    <div className="">
      <Row gutter={[24, 24]}>
        {projectList.map((project) => {
          return (
            <Col span={12} key={project.name}>
              <ProjectItem>
                <div className="l1">{project.name}</div>
                <div className="l2">{project.desc}</div>
                <div className="icon">
                  <IconFont name="icon-javascript-blank" style={{ fontSize: "80px", color: "#ccc" }} />
                </div>
              </ProjectItem>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ProjectCardList;
