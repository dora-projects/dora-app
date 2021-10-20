import * as React from "react";
import { SwapOutlined, ArrowRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Modal, Row, Col, Drawer, Button, Space, Radio } from "antd";
import { SwitchBtn, TeamProjectSwitchPanel } from "./index.styled";
import { useRequest } from "ahooks";
import { getMyProjects } from "@/services/project";
import { useDashboardStore } from "@/stores/dashboard";
import { updateUserDashBoard } from "@/services/user";

const SwitchProject = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const { activeProject, fetch } = useDashboardStore((s) => ({
    activeProject: s.project,
    fetch: s.fetch,
  }));

  const { run: updateDashboard } = useRequest(updateUserDashBoard, {
    manual: true,
    onSuccess: () => {
      fetch();
      setModalVisible(false);
    },
  });

  const { data, run: getProjects } = useRequest(getMyProjects, { manual: true });
  const projectList = data?.data || [];

  React.useEffect(() => {
    if (modalVisible) {
      getProjects();
    }
  }, [getProjects, modalVisible]);

  return (
    <>
      <SwitchBtn
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <div className="l1">
          <span>{activeProject?.name}</span>
          <CaretDownOutlined />
        </div>
        <div className="l2">{activeProject?.type}</div>
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
              {projectList.map((project: any) => {
                return (
                  <Col span={12} key={project.id}>
                    <div
                      className={`project-item ${project.id === activeProject?.id ? "active" : ""}`}
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
