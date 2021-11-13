import React from "react";
import { Button } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import FilterBar from "@/pages/console/components/FilterBar";

const Performance = () => {
  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <ProCard title="性能监控" bordered headerBordered>
        <div>Card content</div>
      </ProCard>
    </div>
  );
};

export default Performance;
