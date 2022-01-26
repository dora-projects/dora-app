import React from "react";
import { Spin } from "antd";
import FilterBar from "@/components/FilterBar";
import { useParams } from "react-router-dom";
import { useUrlQueryStore } from "@/stores";
import { useRequest } from "ahooks";
import { queryReleaseList } from "@/services/analysis";
import List from "./List";

const Releases = () => {
  const params = useParams();
  const appKey = params.appKey;
  const { filterVal } = useUrlQueryStore();
  const {
    data: trendData,
    run,
    loading,
  } = useRequest(queryReleaseList, {
    manual: true,
  });

  React.useEffect(() => {
    if (filterVal) {
      run({
        appKey,
        environment: filterVal.environment,
        release: filterVal.release,
        from: filterVal.from,
        to: filterVal.to,
        size: 30,
      });
    }
  }, [run, filterVal, appKey]);

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
