export const fp = () => {
  return {
    size: 0,
    query: {
      bool: {
        filter: [
          {
            match: {
              appKey: "98e6dbc228a94724969d7225f8494b62",
            },
          },
        ],
      },
    },
    aggregations: {
      fp: {
        percentiles: {
          field: "measurements.fp",
        },
      },
      fpTrend: {
        date_histogram: {
          field: "timestamp",
          fixed_interval: "10m",
          // time_zone: "+08:00",
          // format: "yyyy-MM-dd HH:mm:ss",
        },
        aggregations: {
          fp: {
            percentiles: {
              field: "measurements.fp",
            },
          },
        },
      },
    },
  };
};
