import React from "react";
import { Spin } from "antd";
import FilterBar from "@/pages/console/components/FilterBar";
import { useParams } from "react-router-dom";
import { useFilterStore } from "@/pages/console/store/filterBar";
import { useRequest } from "ahooks";
import { queryReleaseList } from "@/services/analysis";
import List from "./List";

const Releases = () => {
  const params = useParams();
  const appKey = params.appKey;
  const { value: filterValue } = useFilterStore();
  const {
    data: trendData,
    run,
    loading,
  } = useRequest(queryReleaseList, {
    manual: true,
  });

  React.useEffect(() => {
    if (filterValue) {
      run({
        appKey,
        environment: filterValue.environment,
        from: filterValue.from,
        to: filterValue.to,
        size: 30,
      }).then((r) => {});
    }
  }, [run, filterValue, appKey]);

  const list = trendData?.data || [];

  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <Spin spinning={loading}>
        <List list={list} />
      </Spin>
    </div>
  );
};

export default Releases;
