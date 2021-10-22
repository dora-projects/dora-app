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
