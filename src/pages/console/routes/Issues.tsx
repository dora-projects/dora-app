import React from "react";
import { Button, Tag, Space } from "antd";
import ProList from "@ant-design/pro-list";
import { axios } from "@/common/axios";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const Issues = () => (
  <div style={{ padding: "20px" }}>
    <ProList<GithubIssueItem>
      search={{}}
      rowKey="name"
      headerTitle="基础列表"
      request={async (params = {}) =>
        axios
          .get<{
            data: GithubIssueItem[];
          }>("https://proapi.azurewebsites.net/github/issues", {
            params,
          })
          .then((res) => res.data)
      }
      pagination={{
        pageSize: 10,
      }}
      showActions="hover"
      metas={{
        title: {
          dataIndex: "user",
          title: "用户",
          search: false,
        },
        avatar: {
          dataIndex: "avatar",
          search: false,
        },
        description: {
          dataIndex: "title",
          search: false,
        },
        subTitle: {
          dataIndex: "labels",
          render: (_, row) => {
            return (
              <Space size={0}>
                {row.labels?.map((label: { name: string }) => (
                  <Tag color="blue" key={label.name}>
                    {label.name}
                  </Tag>
                ))}
              </Space>
            );
          },
          search: false,
        },
        actions: {
          render: (text, row) => [
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
              链路
            </a>,
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="warning">
              报警
            </a>,
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
              查看
            </a>,
          ],
          search: false,
        },
        status: {
          // 自己扩展的字段，主要用于筛选，不在列表中显示
          title: "状态",
          valueType: "select",
          valueEnum: {
            all: { text: "全部", status: "Default" },
            open: {
              text: "未解决",
              status: "Error",
            },
            closed: {
              text: "已解决",
              status: "Success",
            },
            processing: {
              text: "解决中",
              status: "Processing",
            },
          },
        },
      }}
    />
  </div>
);

export default Issues;
