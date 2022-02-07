import React from "react";
import { ProjectItem } from "./styled";
import { Col, Row } from "antd";
import IconFont from "@/components/IconFont";
import { SettingOutlined, ApiOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store";
import ErrorTrend from "./EventTrend";

interface Props {
  projects: any[];
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
                  <div className="head">
                    <div>
                      <span className="label">项目名：</span>
                      <span
                        className="name"
                        onClick={async () => {
                          dispatch.userConfig.updateUserConfig(item.id);
                          navigate(`/project/${item.appKey}/monitor/overview`);
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                    {item.detail && (
                      <div>
                        <span className="label">描述：</span>
                        <span className="detail">{item.detail}</span>
                      </div>
                    )}
                  </div>
                  <div className="body">
                    <ErrorTrend appKey={item.appKey} />
                  </div>
                </div>
                <div
                  className="top-right-icon"
                  style={{ right: "45px" }}
                  onClick={() => {
                    navigate(`/project/${item.appKey}/install`);
                  }}
                >
                  <ApiOutlined style={{ fontSize: "20px", color: "#adadad" }} />
                </div>
                <div
                  className="top-right-icon"
                  style={{ right: "10px" }}
                  onClick={() => {
                    navigate(`/setting/projects/${item.appKey}`);
                  }}
                >
                  <SettingOutlined style={{ fontSize: "20px", color: "#adadad" }} />
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
