import * as React from "react";
import { SwapOutlined, DownOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Modal, Row, Col, Drawer, Button, Space, Radio } from "antd";
import { SwitchBtn, TeamProjectSwitchPanel } from "./index.styled";
import TagCheckGroup from "@/components/TagCheckGroup";

const SwitchProject = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);

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
          setDrawerVisible(true);
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
        visible={drawerVisible}
        title="切换项目"
        width={800}
        onCancel={() => {
          setDrawerVisible(false);
        }}
        footer={null}
      >
        <TeamProjectSwitchPanel>
          <div className="filter-panel">
            <TagCheckGroup
              title={"团队"}
              value={1}
              options={[
                {
                  label: "哈哈哈",
                  value: 1,
                },
              ]}
              onChange={(v) => {
                console.log(v);
              }}
            />
          </div>
          <div className="list-panel">
            <Row gutter={[24, 24]}>
              {projectList.map((project) => {
                return (
                  <Col span={6} key={project.name}>
                    <div className="project-item">
                      <div className="l1">{project.name}</div>
                      <div className="l2">{project.desc}</div>
                      <div className="icon">
                        <SwapOutlined />
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
