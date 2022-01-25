import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Popconfirm, Radio, Space } from "antd";
import { useRequest } from "ahooks";
import ProCard from "@ant-design/pro-card";
import { deleteProject, getProject, updateProject } from "@/services/project";
import { useNotificationStore, useMyProjectListStore } from "@/stores";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const ProjectSetting = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const notificationsStore = useNotificationStore();
  const projectsStore = useMyProjectListStore();

  const { data: info } = useRequest(() => getProject({ appKey: params?.appKey }), {
    refreshDeps: [params?.appKey],
    ready: !!params?.appKey,
  });
  let editItem: Project = info?.data;

  // restore form
  React.useEffect(() => {
    const { id, type, name, detail } = editItem || {};
    if (id) {
      form.setFieldsValue({
        type,
        name,
        detail,
      });
    }
  }, [editItem, form]);

  const { run: runUpdateProject } = useRequest(updateProject, {
    manual: true,
    onSuccess: () => {
      notificationsStore.addNotification({ type: "success", title: "修改成功" });
    },
  });
  const { run: runDeleteProject } = useRequest(deleteProject, {
    manual: true,
    onSuccess: () => {
      notificationsStore.addNotification({ type: "success", title: "删除成功" });
      projectsStore.fetchMyProjects().then((r) => {
        navigate("/setting/projects/");
      });
    },
  });

  const onFinish = (values: any) => {
    const id = editItem?.id;
    const { type, name, detail } = values;

    if (id) {
      runUpdateProject({ id, detail, type, name });
    }
  };

  return (
    <ProCard title={`编辑-${editItem?.name}`} headerBordered>
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
          <Input placeholder="请输入项目名字" />
        </Form.Item>
        <Form.Item name={"detail"} label="描述">
          <Input.TextArea placeholder="请输入描述" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Popconfirm
              title="你确定删除该项目吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                runDeleteProject(editItem?.id);
              }}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
    </ProCard>
  );
};

export default ProjectSetting;
