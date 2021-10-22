import React from "react";
import { useRequest } from "ahooks";
import { queryByEql } from "@/services/analysis";
import { StatisticCard } from "@ant-design/pro-card";
import { Button } from "antd";

const ErrorCount = () => {
  const { data } = useRequest(queryByEql);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          // run();
        }}
      >
        查询
      </Button>
    </div>
  );
};

export default ErrorCount;
