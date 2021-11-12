import * as React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { SwitchBtn } from "./index.styled";
import { useConsoleProjectInfo } from "@/pages/console/store/project";

const SwitchProject = () => {
  const navigate = useNavigate();
  const { project } = useConsoleProjectInfo();
  return (
    <>
      <SwitchBtn
        onClick={() => {
          // storage.setBackUrl(window.location.pathname);
          navigate("/projects");
        }}
      >
        <div className="l1">
          <span>{project?.name}</span>
          <CaretDownOutlined />
        </div>
        <div className="l2">{project?.type}</div>
      </SwitchBtn>

      <Divider style={{ margin: "0" }} />
    </>
  );
};

export default SwitchProject;
