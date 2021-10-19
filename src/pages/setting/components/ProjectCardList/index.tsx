import React from "react";
import { ProjectItem } from "./index.styled";
import { Col, Row } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import IconFont from "@/components/IconFont";
import { SettingOutlined } from "@ant-design/icons";

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
                <div className="info">
                  <div className="head">
                    <div className="name">{project.name}</div>
                    <div className="desc">{project.desc}</div>
                  </div>
                  <div className="foot">
                    <div className="stat">
                      <div className="count-item">
                        <span>total：</span>
                        <span>231233</span>
                      </div>
                      <div className="count-item">
                        <span>24h count：</span>
                        <span>46742</span>
                      </div>
                    </div>
                    <div className="setting">
                      <SettingOutlined />
                    </div>
                  </div>
                </div>
                <IconFont className={"type-icon"} name="icon-javascript-blank" />
              </ProjectItem>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ProjectCardList;
