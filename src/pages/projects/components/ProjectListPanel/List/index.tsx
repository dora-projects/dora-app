import React from "react";
import { ProjectItem } from "./index.styled";
import { Col, Row } from "antd";
import IconFont from "@/components/IconFont";
import { ArrowRightOutlined, SettingOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { updateUserSetting } from "@/services/user";
import { useSettingStore } from "@/stores/setting";
import { Link, useNavigate } from "react-router-dom";
import storage from "@/utils/storage";

interface Props {
  projects: any[];
  onClickSetting: (project: any) => void;
}

const ProjectCardList = (props: Props) => {
  const navigate = useNavigate();

  const { loading, fetchSetting, project: showProject } = useSettingStore();
  console.log(showProject);

  React.useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  // 切换
  const { run: updateDashboard } = useRequest(updateUserSetting, {
    manual: true,
    onSuccess: () => {
      fetchSetting();

      // 跳转至原来的 url
      const url = storage.getBackUrl();
      navigate(url || "/console/overview");
    },
  });

  return (
    <Row gutter={[24, 24]}>
      {props.projects.map((project) => {
        return (
          <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} key={project.id}>
            <ProjectItem className={project.id === showProject?.id ? "active" : ""}>
              <div className="item-panel">
                <div className="head" onClick={() => updateDashboard(project.id)}>
                  <div>
                    <span className="label">项目名：</span>
                    <span className="name">{project.name}</span>
                  </div>
                  <div>
                    <span className="label">描述：</span>
                    <span className="detail">{project.detail}</span>
                  </div>
                </div>
                <div className="body">
                  <div className="stat">
                    <div className="count-item">
                      <span>事件数：</span>
                      <span>231233</span>
                    </div>
                    <div className="count-item">
                      <span>24h：</span>
                      <span>46742</span>
                    </div>
                  </div>
                </div>
                <div className="foot">
                  <Link to={`${project.appKey}/sdk`}>接入指南</Link>
                </div>
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
