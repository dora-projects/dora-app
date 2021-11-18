import React from "react";
import { Spin } from "antd";
import FilterBar from "@/pages/console/components/FilterBar";
import PerfSummary from "./PerfSummary";
import { useRange, useP75, useHistogram } from "./hooks";
import { FP_FCP_EVALUATE, FID_EVALUATE, LCP_EVALUATE, CLS_EVALUATE } from "@/utils/chart";

const Performance = () => {
  const { data: p75, loading: p75Loading } = useP75();
  const { data: range, loading: rangeLoading } = useRange();
  const { data: histogram, loading: histogramLoading } = useHistogram();
  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <Spin spinning={p75Loading || rangeLoading || histogramLoading}>
        <PerfSummary
          title="First Paint (FP)"
          p75={p75.fp}
          ratios={range.fp}
          histogram={histogram.fp}
          evaluate={FP_FCP_EVALUATE}
        />
        <PerfSummary
          title="First Contentful Paint (FCP)"
          p75={p75.fcp}
          ratios={range.fcp}
          histogram={histogram.fcp}
          evaluate={FP_FCP_EVALUATE}
        />
        <PerfSummary
          title="Largest Contentful Paint (LCP)"
          p75={p75.lcp}
          ratios={range.lcp}
          histogram={histogram.lcp}
          evaluate={LCP_EVALUATE}
        />
        <PerfSummary
          title="First Input Delay (FID)"
          p75={p75.fid}
          ratios={range.fid}
          histogram={histogram.fid}
          evaluate={FID_EVALUATE}
        />
        <PerfSummary
          title="Cumulative Layout Shift (CLS)"
          p75={p75.cls}
          ratios={range.cls}
          histogram={histogram.cls}
          evaluate={CLS_EVALUATE}
        />
      </Spin>
    </div>
  );
};

export default Performance;
