import React from "react";
import { Form, Input, Select, Button, Drawer, Divider, Radio, Typography } from "antd";
import { Tabs } from "antd";
import SdkUsage from "@/components/SdkUsage";
import Members from "./Members";

const { Title, Paragraph, Text, Link } = Typography;

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 6 },
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

  React.useEffect(() => {
    if (editItem?.id) {
      form.setFieldsValue({
        name: editItem.name,
      });
    }
  }, [editItem?.id, editItem?.name, editItem?.slug, form]);

  React.useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  const onFinish = (values: any) => {
    console.log(values);
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
      <Form form={form} {...layout} name="form-team" onFinish={onFinish}>
        <Form.Item name={"type"} label="类型" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>web</Radio>
            <Radio value={2}>react</Radio>
            <Radio value={3}>vue</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={"name"} label="项目名字" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"detail"} label="详细说明">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>

      {isEdit ? (
        <>
          <Divider />
          <Tabs defaultActiveKey="1">
            <TabPane tab="成员管理" key="1">
              <Members />
            </TabPane>
            <TabPane tab="安装指引" key="2">
              <SdkUsage />
            </TabPane>
          </Tabs>
        </>
      ) : null}
    </Drawer>
  );
};

export default ManageDrawer;
