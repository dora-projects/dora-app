import React from "react";
import { useNavigate } from "react-router-dom";
import ProCard from "@ant-design/pro-card";
import { Form, Input, Space, Button, Drawer, Divider, Radio, Typography, Popconfirm } from "antd";
import { createProject } from "@/services/project";
import { useRequest } from "ahooks";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const ProjectCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { run: runCreateProject } = useRequest(createProject, {
    manual: true,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const onFinish = (values: any) => {
    const { type, name, detail } = values;
    runCreateProject({ detail, type, name });
  };

  return (
    <ProCard title="创建新项目" bodyStyle={{ minHeight: "500px" }}>
      <Form
        form={form}
        {...layout}
        initialValues={{
          type: "web",
        }}
        name="form-team"
        onFinish={onFinish}
      >
        <Form.Item name={"type"} label="类型" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={"web"}>web</Radio>
            <Radio value={"react"}>react</Radio>
            <Radio value={"vue"}>vue</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={"name"} label="项目名字" rules={[{ required: true }]}>
          <Input placeholder="请输入项目名字" style={{ width: "400px" }} />
        </Form.Item>
        <Form.Item name={"detail"} label="描述">
          <Input.TextArea placeholder="请输入描述" style={{ width: "400px" }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ProCard>
  );
};
