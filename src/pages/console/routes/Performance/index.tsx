import React from "react";
import FilterBar from "@/pages/console/components/FilterBar";
import PerfSummary from "./PerfSummary";
import { useRange, useP75, useHistogram } from "./hooks";

const Performance = () => {
  const p75 = useP75();
  const range = useRange();
  const histogram = useHistogram();
  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <PerfSummary title="First Paint (FP)" p75={p75.fp} ratios={range.fp} histogram={histogram.fp} />
      <PerfSummary title="First Contentful Paint (FCP)" p75={p75.fcp} ratios={range.fcp} histogram={histogram.fcp} />
      <PerfSummary title="Largest Contentful Paint (LCP)" p75={p75.lcp} ratios={range.lcp} histogram={histogram.lcp} />
      <PerfSummary title="First Input Delay (FID)" p75={p75.fid} ratios={range.fid} histogram={histogram.fid} />
      <PerfSummary title="Cumulative Layout Shift (CLS)" p75={p75.cls} ratios={range.cls} histogram={histogram.cls} />
    </div>
  );
};

export default Performance;
