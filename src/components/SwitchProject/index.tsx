import * as React from "react";
import { SwapOutlined, ArrowRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Modal, Row, Col, Drawer, Button, Space, Radio } from "antd";
import { SwitchBtn, TeamProjectSwitchPanel } from "./index.styled";
import TagCheckGroup from "@/components/TagCheckGroup";

const SwitchProject = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const projectList = [
    {
      name: "我是项目",
      desc: "我是项目",
      type: "我是项目",
    },
    {
      name: "我是项目",
      desc: "我是项目",
      type: "我是项目",
    },
    {
      name: "我是项目",
      desc: "我是项目",
      type: "我是项目",
    },
    {
      name: "我是项目",
      desc: "我是项目",
      type: "我是项目",
    },
  ];

  return (
    <>
      <SwitchBtn
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <div className="l1">
          <span>小队虎牙</span>
          <CaretDownOutlined />
        </div>
        <div className="l2">javascriptddd</div>
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
              {projectList.map((project) => {
                return (
                  <Col span={6} key={project.name}>
                    <div className="project-item">
                      <div className="l1">{project.name}</div>
                      <div className="l2">{project.desc}</div>
                      <div className="icon">
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
