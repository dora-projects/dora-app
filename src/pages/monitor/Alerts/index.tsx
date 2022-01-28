import React from "react";
import { Table, Button, Divider, Avatar, Tooltip, Switch, Space, Popconfirm } from "antd";
import ProCard from "@ant-design/pro-card";
import { useRequest } from "ahooks";
import { getAlertList, deleteAlertRule, toggleAlertRule } from "@/services/alert";
import AlertForm from "./AlertForm";
import { humanTime } from "@/utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const Alerts = () => {
  const [editItem, setEditItem] = React.useState(null);
  const projectId = useSelector((state: RootState) => state.userConfig?.project?.id);

  const {
    data,
    refresh,
    loading: listLoading,
  } = useRequest(() => getAlertList(projectId!), {
    ready: !!projectId,
  });

  const { runAsync: deleteRule } = useRequest(deleteAlertRule, {
    manual: true,
  });
  const { runAsync: toggle, loading: toggleLoading } = useRequest(toggleAlertRule, {
    manual: true,
  });

  const list = data?.data || [];
  const columns = [
    {
      title: "是否开启",
      dataIndex: "open",
      render(t: any, row: any) {
        return (
          <Switch
            loading={toggleLoading}
            checked={t}
            onChange={(checked) => {
              toggle({ ruleId: row.id, open: checked }).then((e) => {
                if (e.data?.success) {
                  refresh();
                }
              });
            }}
          />
        );
      },
    },
    {
      title: "规则名字",
      dataIndex: "name",
    },
    {
      title: "筛选",
      dataIndex: "filter",
      width: 300,
      render: (t: any) => {
        return (
          <Tooltip title={<pre style={{ fontSize: "12px" }}>{JSON.stringify(t, null, 2)}</pre>}>
            <span style={{ fontSize: "12px" }}>{JSON.stringify(t)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "条件",
      dataIndex: "id",
      render(_: any, row: any) {
        const { thresholdsTime, thresholdsOperator, thresholdsQuota } = row;
        return `${humanTime(thresholdsTime)}内 ${thresholdsOperator} ${thresholdsQuota} 次`;
      },
    },
    {
      title: "静默 (分钟)",
      dataIndex: "silence",
    },
    {
      title: "告警次数",
      dataIndex: "alert_log",
      render(t: any, row: any) {
        return t?.length || 0;
      },
    },
    {
      title: "联系人",
      dataIndex: "alert_contact",
      render(contacts: any, row: any) {
        return (
          <Avatar.Group maxCount={contacts?.length} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {contacts?.map((contact: any) => {
              const { user } = contact || {};
              return (
                <Tooltip key={contact.id} title={`${user?.username} (${user?.email})`} placement="top">
                  <Avatar style={{ backgroundColor: "#f56a00" }}>{user?.username?.slice(0, 1)}</Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (t: any, row: any) => {
        return (
          <Space>
            <Button
              size={"small"}
              type="primary"
              onClick={() => {
                setEditItem(row);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title={"确认删除吗？"}
              onConfirm={() => {
                return deleteRule(t).then((e) => {
                  if (e.data?.success) {
                    return refresh();
                  }
                });
              }}
            >
              <Button size={"small"} type="text" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <ProCard title="告警规则" bordered headerBordered>
        <AlertForm
          editItem={editItem}
          onSuccess={() => {
            setEditItem(null);
            refresh();
          }}
          onCancel={() => {
            setEditItem(null);
          }}
        />
        <Divider />
        <Table loading={listLoading} rowKey="id" dataSource={list} columns={columns} pagination={false} />
      </ProCard>
    </div>
  );
};
