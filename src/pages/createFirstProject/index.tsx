import React, { useEffect } from "react";
import { Button, message, Radio } from "antd";
import { ProFormRadio, ProFormTextArea, ProFormText, LoginForm } from "@ant-design/pro-form";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { createProject } from "@/services/project";
import { useProjectsStore } from "@/stores/projects";

export const CreateFPForm = () => {
  const navigate = useNavigate();
  const { fetchProjects, projects } = useProjectsStore();

  React.useEffect(() => {
    if (projects && projects.length > 0) {
      navigate("/");
    }
  }, [navigate, projects]);

  const { run: runCreateProject, loading } = useRequest(createProject, {
    manual: true,
    onSuccess: async (res) => {
      if (res.status === 200) {
        message.success("创建成功！");
        fetchProjects();
      }
    },
  });

  return (
    <div style={{ backgroundColor: "white", paddingTop: "30px" }}>
      <LoginForm
        logo={null}
        title="创建你的第一个项目"
        subTitle=" "
        layout="horizontal"
        onFinish={async (values) => {
          const { type, name, detail } = values;
          await runCreateProject({ type, name, detail });
        }}
        submitter={{
          render: (props) => {
            return [
              <Button
                loading={loading}
                type="primary"
                key="submit"
                size={"large"}
                style={{ width: "100%" }}
                onClick={() => props.form?.submit?.()}
              >
                确定
              </Button>,
            ];
          },
        }}
      >
        <ProFormRadio.Group
          name="type"
          fieldProps={{ size: "large" }}
          placeholder={"类型"}
          rules={[{ required: true, message: "请输入类型!" }]}
          options={[
            {
              label: "web",
              value: "web",
            },
            {
              label: "react",
              value: "react",
            },
            {
              label: "vue",
              value: "vue",
            },
          ]}
        />
        <ProFormText
          name="name"
          fieldProps={{ size: "large" }}
          placeholder={"项目名字"}
          rules={[{ required: true, message: "请输入项目名字!" }]}
        />
        <ProFormTextArea name="detail" fieldProps={{ size: "large" }} placeholder={"描述"} />
      </LoginForm>
    </div>
  );
};

export default CreateFPForm;
