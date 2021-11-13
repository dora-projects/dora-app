import React from "react";
import { Button } from "antd";
import ProCard from "@ant-design/pro-card";
import FilterBar from "@/pages/console/components/FilterBar";

const Releases = () => {
  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <ProCard title="版本" bordered headerBordered>
        <div>Card content</div>
      </ProCard>
    </div>
  );
};

export default Releases;
