import React from "react";
import { Tooltip, Empty } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { ArtifactItem } from "./styled";
import { formNow } from "@/utils/date";

const List = () => {
  const listData: any[] = [];

  if (!listData || listData?.length <= 0) {
    return (
      <div style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
      </div>
    );
  }

  return (
    <>
      {listData?.map((item: any) => {
        return (
          <ArtifactItem key={item.key}>
            <div className="total">
              <Tooltip placement="topLeft" title={item.key}>
                <span className="version">{item.key}</span>
              </Tooltip>
              <div className="time">
                <span className="latest">{formNow(item.latest?.value_as_string)} — </span>
                <span className="earliest">{formNow(item.earliest?.value_as_string)}</span>
              </div>
            </div>
            <div className="count">
              <div className="category">
                事件总数：<span>{item.countEvent?.value}</span>
              </div>
              <div className="category">
                错误总数：<span>{item.countError?.count?.value}</span>
              </div>
            </div>
          </ArtifactItem>
        );
      })}
    </>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <PageContainer title="制品管理">
      <List />
    </PageContainer>
  );
};
