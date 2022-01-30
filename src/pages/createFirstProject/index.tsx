import React, { useEffect } from "react";
import { Button, message, Radio } from "antd";
import { ProFormRadio, ProFormTextArea, ProFormText, LoginForm } from "@ant-design/pro-form";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { createProject } from "@/services/project";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store";

export const CreateFPForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();

  const { run: runCreateProject, loading } = useRequest(createProject, {
    manual: true,
    onSuccess: async (res) => {
      if (res.status === 200 && res.data) {
        message.success("创建成功！");
        await dispatch.userConfig.updateUserConfig(res.data.id);
        navigate("/");
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
