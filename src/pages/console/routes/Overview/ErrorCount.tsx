import React from "react";
import { useRequest } from "ahooks";
import { queryByEql } from "@/services/analysis";
import { StatisticCard } from "@ant-design/pro-card";
import { errorCount } from "@/eql";
import { useParams } from "react-router-dom";
import { useFilterStore } from "@/pages/console/store/filterBar";

const ErrorCount = () => {
  const params = useParams();
  const { appKey, fingerprint } = params;
  const { value: filterValue } = useFilterStore();

  const { run, data } = useRequest((args) => queryByEql({ eql: errorCount(args) }), { manual: true });

  React.useEffect(() => {
    if (filterValue) {
      run({
        appKey,
        environment: filterValue.environment,
        release: filterValue.release,
        from: filterValue.from,
        to: filterValue.to,
      }).then((r) => {});
    }
  }, [run, filterValue, appKey, fingerprint]);

  const count = data?.data?.hits?.total?.value;

  return (
    <StatisticCard
      statistic={{
        title: "错误",
        value: count,
        // description: <Statistic title="较昨天" value="8.04%" trend="down" />,
      }}
    />
  );
};

export default ErrorCount;
