export const queryErrorCount = (appKey?: string) => {
  console.log("--------------------------------");
  return {
    size: 0,
    query: {
      bool: {
        filter: [
          {
            match: {
              appKey: appKey,
            },
          },
          {
            match: {
              type: "error",
            },
          },
          // {
          //   range: {
          //     ts: {
          //       gte: 123123,
          //       lte: 123123,
          //     },
          //   },
          // },
        ],
      },
    },
    aggregations: {
      count: {
        cardinality: {
          field: "event_id.keyword",
        },
      },
    },
  };
};

export const queryErrorTrend = (appKey: string, from: number, to: number, interval: number) => {
  return {
    size: 12,
    query: {
      bool: {
        filter: [
          {
            match: {
              appKey: appKey,
            },
          },
          {
            match: {
              type: "error",
            },
          },
          {
            range: {
              timestamp: {
                gte: from,
                lte: to,
              },
            },
          },
        ],
      },
    },
    aggregations: {
      trend: {
        date_histogram: {
          field: "timestamp",
          fixed_interval: interval + "m",
          // time_zone: "+08:00",
          // format: "yyyy-MM-dd HH:mm:ss",
        },
        aggregations: {
          count: {
            cardinality: {
              field: "event_id.keyword",
            },
          },
        },
      },
    },
  };
};
