import React from "react";
import { ProjectItem } from "./index.styled";
import { Col, Row } from "antd";
import IconFont from "@/components/IconFont";
import { ArrowRightOutlined, SettingOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { updateUserSetting } from "@/services/user";
import { useSettingStore } from "@/stores/setting";
import { useNavigate } from "react-router-dom";
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
              <div className="info">
                <div className="head" onClick={() => updateDashboard(project.id)}>
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
                  <div className="setting" onClick={() => props.onClickSetting(project)}>
                    <SettingOutlined style={{ fontSize: "16px", color: "#666" }} />
                  </div>
                </div>
              </div>
              <IconFont className={"type-icon"} name="icon-javascript-blank" />
            </ProjectItem>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProjectCardList;
