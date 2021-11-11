import React from "react";
import { Button, Form, Input, Space, InputNumber, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ThresholdInput, { ThresholdValue } from "./ThresholdInput";
import { useRequest } from "ahooks";
import { createAlertRule, deleteAlertRule, updateAlertRule } from "@/services/alert";
import { useSettingStore } from "@/stores/setting";
import UserSelect from "@/components/UserSelect";

const checkThreshold = (_: any, value: ThresholdValue) => {
  if (!value) {
    return Promise.reject(new Error("请自定义阈值"));
  }
  if (!value.time || value.time <= 0) {
    return Promise.reject(new Error("请输入时间"));
  }
  if (!value.quota || value.quota <= 0) {
    return Promise.reject(new Error("请输入数量"));
  }
  return Promise.resolve();
};

// const checkFilter = (_: any, value: any) => {
//   if (!Array.isArray(value)) {
//     return Promise.reject(new Error("请输入过滤项"));
//   }
//   return Promise.resolve();
// };

interface Props {
  editItem: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const AlertsForm = (props: Props) => {
  const [form] = Form.useForm();
  const projectId = useSettingStore((state) => state.project?.id);

  const { run: create } = useRequest(createAlertRule, { manual: true });
  const { run: update } = useRequest(updateAlertRule, { manual: true });

  // 表单恢复
  React.useEffect(() => {
    if (!props.editItem) return;
    const { name, filter, silence, contacts, thresholdsTime, thresholdsOperator, thresholdsQuota } = props.editItem;

    let timeUnit;
    let time;

    // 转换
    if (thresholdsTime < 60) {
      timeUnit = "second";
      time = thresholdsTime;
    } else {
      timeUnit = "minute";
      time = thresholdsTime / 60;
    }
    const userIds = contacts.map((contact: any) => contact.user.id);

    form.setFieldsValue({
      name,
      filter,
      silence,
      userIds,
      threshold: {
        timeUnit,
        time,
        operator: thresholdsOperator,
        quota: thresholdsQuota,
      },
    });
  }, [props.editItem, form]);

  const onSubmit = (data: any) => {
    const { projectId, name, filter, silence, userIds, thresholdsTime, thresholdsOperator, thresholdsQuota } = data;

    if (props.editItem) {
      update({
        id: props.editItem?.id,
        projectId,
        name,
        filter,
        silence,
        userIds,
        thresholdsTime,
        thresholdsOperator,
        thresholdsQuota,
      }).then((e) => {
        if (e.data?.success) {
          message.success("更新成功");
          props.onSuccess();
          form.resetFields();
        }
      });
    } else {
      create({
        projectId,
        name,
        filter,
        silence,
        userIds,
        thresholdsTime,
        thresholdsOperator,
        thresholdsQuota,
      }).then((e) => {
        if (e.data?.success) {
          message.success("创建成功");
          props.onSuccess();
          form.resetFields();
        }
      });
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <Form
        form={form}
        // size="small"
        initialValues={{
          filter: [{}],
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        onFinish={(values) => {
          console.log(values);

          const { name, filter, threshold, silence, userIds } = values || {};
          const { time, timeUnit, operator, quota } = threshold || {};
          const second = timeUnit === "minute" ? time * 60 : time;

          onSubmit({
            projectId,
            name,
            filter,
            silence,
            userIds,
            thresholdsTime: second,
            thresholdsOperator: operator,
            thresholdsQuota: quota,
          });
        }}
        onValuesChange={(_, all) => {
          // console.log(all);
        }}
      >
        <Form.Item label="规则名字" name="name" rules={[{ required: true, message: "请输入规则名字" }]}>
          <Input placeholder="规则名字" />
        </Form.Item>
        <Form.Item label="筛选条件" required>
          <Form.List name="filter">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Space key={key} style={{ display: "flex" }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      fieldKey={[fieldKey, "key"]}
                      rules={[{ required: true, message: "请输入" }]}
                    >
                      <Input placeholder="key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      fieldKey={[fieldKey, "value"]}
                      rules={[{ required: true, message: "请输入" }]}
                    >
                      <Input placeholder="value" />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{
                        color: index === 0 ? "#ccc" : "#000",
                        cursor: index === 0 ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (index === 0) return;
                        remove(name);
                      }}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加条件
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        {/* 多少时间内 大约/小于 等于 多少*/}
        <Form.Item label="条件" required name="threshold" rules={[{ validator: checkThreshold }]}>
          <ThresholdInput />
        </Form.Item>

        <Form.Item label="静默 (分钟)" name="silence" rules={[{ required: true, message: "请选择时间" }]}>
          <InputNumber placeholder="时间" />
        </Form.Item>

        <Form.Item label="告警联系人" required name="userIds" rules={[{ required: true, message: "请选择时间" }]}>
          <UserSelect />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button htmlType="submit" type="primary" loading={false}>
              {props.editItem ? "编辑" : "添加"}
            </Button>

            {props.editItem ? (
              <Button
                onClick={() => {
                  props.onCancel();
                }}
              >
                取消
              </Button>
            ) : (
              <Button htmlType="reset" loading={false}>
                重置
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AlertsForm;
