import React from "react";
import { useParams } from "react-router-dom";
import { useFilterStore } from "@/pages/projects/store/filterBar";
import { useRequest } from "ahooks";
import { queryWebVitalsHistogram, queryWebVitalsPercentiles, queryWebVitalsRange } from "@/services/analysis";
import { CLS_EVALUATE, FID_EVALUATE, FP_FCP_EVALUATE, LCP_EVALUATE, colourData } from "@/utils/chart";

const getRatio = (buckets = []) => {
  const classification = buckets?.reduce((acc: any, cur: any) => {
    acc[cur["key"]] = cur["doc_count"];
    return acc;
  }, {});
  const { good = 0, meh = 0, bad = 0 } = classification || {};
  const total = good + meh + bad;

  return {
    good: total ? good / total : 0,
    meh: total ? meh / total : 0,
    bad: total ? bad / total : 0,
  };
};

export const useRange = () => {
  const params = useParams();
  const { appKey } = params;
  const { value: filterValue } = useFilterStore();

  const { data: rangData, loading } = useRequest(
    () =>
      queryWebVitalsRange({
        appKey,
        environment: filterValue?.environment,
        release: filterValue?.release,
        from: filterValue?.from,
        to: filterValue?.to,
      }),
    {
      refreshDeps: [appKey, filterValue],
    }
  );

  const result = React.useMemo(() => {
    return {
      fp: getRatio(rangData?.data?.fp?.buckets),
      fcp: getRatio(rangData?.data?.fcp?.buckets),
      lcp: getRatio(rangData?.data?.lcp?.buckets),
      fid: getRatio(rangData?.data?.fid?.buckets),
      cls: getRatio(rangData?.data?.cls?.buckets),
    };
  }, [rangData]);

  return { data: result, loading };
};

export const useP75 = () => {
  const params = useParams();
  const { appKey } = params;
  const { value: filterValue } = useFilterStore();

  const { data: percentilesData, loading } = useRequest(
    () =>
      queryWebVitalsPercentiles({
        appKey,
        environment: filterValue?.environment,
        release: filterValue?.release,
        from: filterValue?.from,
        to: filterValue?.to,
      }),
    {
      refreshDeps: [appKey, filterValue],
    }
  );

  const result = React.useMemo(() => {
    return {
      fp: percentilesData?.data?.fp?.values?.["75.0"],
      fcp: percentilesData?.data?.fcp?.values?.["75.0"],
      lcp: percentilesData?.data?.lcp?.values?.["75.0"],
      fid: percentilesData?.data?.fid?.values?.["75.0"],
      cls: percentilesData?.data?.cls?.values?.["75.0"],
    };
  }, [percentilesData]);

  return { data: result, loading };
};

export const useHistogram = () => {
  const params = useParams();
  const { appKey } = params;
  const { value: filterValue } = useFilterStore();

  const { data: histogramData, loading } = useRequest(
    () =>
      queryWebVitalsHistogram({
        appKey,
        environment: filterValue?.environment,
        release: filterValue?.release,
        from: filterValue?.from,
        to: filterValue?.to,
      }),
    {
      refreshDeps: [appKey, filterValue],
    }
  );

  const result = React.useMemo(() => {
    return {
      fp: colourData(histogramData?.data?.fp?.buckets, FP_FCP_EVALUATE),
      fcp: colourData(histogramData?.data?.fcp?.buckets, FP_FCP_EVALUATE),
      lcp: colourData(histogramData?.data?.lcp?.buckets, LCP_EVALUATE),
      fid: colourData(histogramData?.data?.fid?.buckets, FID_EVALUATE),
      cls: colourData(histogramData?.data?.cls?.buckets, CLS_EVALUATE),
    };
  }, [histogramData]);

  return { data: result, loading };
};
