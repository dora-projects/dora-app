import React from "react";
import { Form, Input, Space, Button, Drawer, Divider, Radio, Typography, Popconfirm } from "antd";
import { Tabs } from "antd";
import Members from "./Members";
import { createProject, updateProject, deleteProject } from "@/services/project";
import { useRequest } from "ahooks";

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

interface Props {
  editItem: any;
  visible: boolean;
  onOk: () => void;
  onClose: () => void;
}

const ManageDrawer = (props: Props) => {
  const { visible, editItem, onOk, onClose } = props;
  const isEdit = !!editItem;

  const [form] = Form.useForm();

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

  // reset form
  React.useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  const { run: runCreateProject } = useRequest(createProject, {
    manual: true,
    onSuccess: () => {
      props.onOk();
    },
  });
  const { run: runUpdateProject } = useRequest(updateProject, {
    manual: true,
    onSuccess: () => {
      props.onOk();
    },
  });
  const { run: runDeleteProject } = useRequest(deleteProject, {
    manual: true,
    onSuccess: () => {
      props.onOk();
    },
  });

  const onFinish = (values: any) => {
    const id = editItem?.id;
    const { type, name, detail } = values;

    if (isEdit) {
      runUpdateProject({ id, detail, type, name });
    } else {
      runCreateProject({ detail, type, name });
    }
  };

  return (
    <Drawer
      visible={visible}
      width={800}
      title={isEdit ? "编辑项目" : "新增项目"}
      forceRender
      onClose={() => onClose()}
      footer={null}
    >
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
            {isEdit ? (
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
            ) : null}
          </Space>
        </Form.Item>
      </Form>

      {isEdit ? (
        <>
          <Divider />
          <Tabs defaultActiveKey="1">
            <TabPane tab="成员管理" key="1">
              <Members projectId={editItem?.id} />
            </TabPane>
          </Tabs>
        </>
      ) : null}
    </Drawer>
  );
};

export default ManageDrawer;
