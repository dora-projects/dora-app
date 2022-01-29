import React from "react";
import { ProjectItem } from "./styled";
import { Col, Row } from "antd";
import IconFont from "@/components/IconFont";
import { SettingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store";
import ErrorTrend from "./EventTrend";

interface Props {
  projects: any[];
  onClickSetting: (project: any) => void;
}

const ProjectCardList = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const project = useSelector((state: RootState) => state.userConfig?.project);

  return (
    <Row gutter={[24, 24]}>
      {props.projects &&
        props.projects.map((item) => {
          return (
            <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} key={item.id}>
              <ProjectItem className={item.id === project?.id ? "active" : ""}>
                <div className="item-panel">
                  <div
                    className="head"
                    onClick={async () => {
                      dispatch.userConfig.updateUserSetting(item.id);
                      navigate(`/project/${item.appKey}/monitor/overview`);
                    }}
                  >
                    <div>
                      <span className="label">项目名：</span>
                      <span className="name">{item.name}</span>
                    </div>
                    <div>
                      <span className="label">描述：</span>
                      <span className="detail">{item.detail}</span>
                    </div>
                  </div>
                  <div className="body">
                    <ErrorTrend appKey={item.appKey} />
                  </div>
                  {/*<div className="foot">*/}
                  {/*  <Link to={`/project/${item.appKey}/install`}>接入指南</Link>*/}
                  {/*</div>*/}
                </div>
                <div className="setting-icon" onClick={() => props.onClickSetting(project)}>
                  <SettingOutlined style={{ fontSize: "20px", color: "#666" }} />
                </div>
                <IconFont className="type-icon" name="icon-javascript-blank" />
              </ProjectItem>
            </Col>
          );
        })}
    </Row>
  );
};

export default ProjectCardList;
