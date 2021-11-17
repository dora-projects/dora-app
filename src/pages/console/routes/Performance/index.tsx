import React from "react";
import ProCard from "@ant-design/pro-card";
import FilterBar from "@/pages/console/components/FilterBar";
import { useRequest } from "ahooks";
import { queryWebVitalsPercentiles, queryWebVitalsRange, queryWebVitalsHistogram } from "@/services/analysis";
import { useFilterStore } from "@/pages/console/store/filterBar";
import { useParams } from "react-router-dom";

const Performance = () => {
  const params = useParams();
  const { appKey } = params;
  const { value: filterValue } = useFilterStore();

  const { data: rangData } = useRequest(() =>
    queryWebVitalsRange({
      appKey,
      environment: filterValue?.environment,
      release: filterValue?.release,
      from: filterValue?.from,
      to: filterValue?.to,
    })
  );

  const { data: percentilesData } = useRequest(() =>
    queryWebVitalsPercentiles({
      appKey,
      environment: filterValue?.environment,
      release: filterValue?.release,
      from: filterValue?.from,
      to: filterValue?.to,
    })
  );

  const { data: histogramData } = useRequest(() =>
    queryWebVitalsHistogram({
      appKey,
      environment: filterValue?.environment,
      release: filterValue?.release,
      from: filterValue?.from,
      to: filterValue?.to,
    })
  );

  console.log(rangData, percentilesData, histogramData);

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
