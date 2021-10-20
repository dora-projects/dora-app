import React from "react";
import { ProjectItem } from "./index.styled";
import { Col, Row } from "antd";
import IconFont from "@/components/IconFont";
import { ArrowRightOutlined, SettingOutlined } from "@ant-design/icons";

interface Props {
  projects: any[];
  onClickSetting: (project: any) => void;
}

const ProjectCardList = (props: Props) => {
  return (
    <div className="">
      <Row gutter={[24, 24]}>
        {props.projects.map((project) => {
          return (
            <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} key={project.id}>
              <ProjectItem>
                <div className="info">
                  <div
                    className="head"
                    onClick={() => {
                      props.onClickSetting(project);
                    }}
                  >
                    <div className="name">{project.name}</div>
                    <div className="detail">{project.detail}</div>
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
                    <div
                      className="setting"
                      onClick={() => {
                        console.log(project);
                        // props.onClickSetting(project);
                      }}
                    >
                      <ArrowRightOutlined style={{ fontSize: "16px", color: "#666" }} />
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
