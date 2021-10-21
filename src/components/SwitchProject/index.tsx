import * as React from "react";
import { SwapOutlined, ArrowRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Modal, Row, Col, Drawer, Button, Space, Radio } from "antd";
import { SwitchBtn, TeamProjectSwitchPanel } from "./index.styled";
import { useRequest } from "ahooks";
import { useSettingStore } from "@/stores/setting";
import { updateUserSetting } from "@/services/user";
import { useProjectsStore } from "@/stores/projects";

const SwitchProject = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { loading: loading1, fetchProjects, projects } = useProjectsStore();
  const { loading: loading2, fetchSetting, project: showProject } = useSettingStore();

  React.useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  React.useEffect(() => {
    if (modalVisible) {
      fetchProjects();
    }
  }, [fetchProjects, modalVisible]);

  // 切换
  const { run: updateDashboard } = useRequest(updateUserSetting, {
    manual: true,
    onSuccess: () => {
      fetchSetting();
      setModalVisible(false);
    },
  });

  return (
    <>
      <SwitchBtn
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <div className="l1">
          <span>{showProject?.name}</span>
          <CaretDownOutlined />
        </div>
        <div className="l2">{showProject?.type}</div>
      </SwitchBtn>

      <Divider style={{ margin: "0" }} />

      <Modal
        visible={modalVisible}
        title="切换项目"
        forceRender
        width={800}
        onCancel={() => {
          setModalVisible(false);
        }}
        footer={null}
      >
        <TeamProjectSwitchPanel>
          <div className="list-panel">
            <Row gutter={[24, 24]}>
              {projects?.map((project: any) => {
                return (
                  <Col span={12} key={project.id}>
                    <div
                      className={`project-item ${project.id === showProject?.id ? "active" : ""}`}
                      onClick={() => {
                        updateDashboard(project.id);
                      }}
                    >
                      <div className="left">
                        <div className="l1">{project.name}</div>
                        <div className="l2">{project.detail}</div>
                      </div>
                      <div className="right icon">
                        <ArrowRightOutlined />
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </TeamProjectSwitchPanel>
      </Modal>
    </>
  );
};

export default SwitchProject;
