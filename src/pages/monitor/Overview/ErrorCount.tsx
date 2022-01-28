import React from "react";
import { useRequest } from "ahooks";
import { queryCount } from "@/services/analysis";
import { StatisticCard } from "@ant-design/pro-card";
import { useParams } from "react-router-dom";

const ErrorCount = () => {
  const params = useParams();
  const { appKey, fingerprint } = params;
  // const { filterVal } = useUrlQueryStore();

  const { run, data } = useRequest(queryCount, { manual: true });

  // React.useEffect(() => {
  //   if (filterVal) {
  //     run({
  //       appKey,
  //       type: "error",
  //       environment: filterVal.environment,
  //       release: filterVal.release,
  //       from: filterVal.from,
  //       to: filterVal.to,
  //     });
  //   }
  // }, [run, filterVal, appKey, fingerprint]);

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
