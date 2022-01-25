import React from "react";
import { useRequest } from "ahooks";
import { queryCount } from "@/services/analysis";
import { StatisticCard } from "@ant-design/pro-card";
import { useParams } from "react-router-dom";
import { useFilterStore } from "@/stores";

const ErrorCount = () => {
  const params = useParams();
  const { appKey, fingerprint } = params;
  const { value: filterValue } = useFilterStore();

  const { run, data } = useRequest(queryCount, { manual: true });

  React.useEffect(() => {
    if (filterValue) {
      run({
        appKey,
        type: "error",
        environment: filterValue.environment,
        release: filterValue.release,
        from: filterValue.from,
        to: filterValue.to,
      }).then((r) => {});
    }
  }, [run, filterValue, appKey, fingerprint]);

  return (
    <StatisticCard
      statistic={{
        title: "错误",
        value: data?.data?.value || 0,
        // description: <Statistic title="较昨天" value="8.04%" trend="down" />,
      }}
    />
  );
};

export default ErrorCount;
