export const viewCount = (params: RangeParams & CommonParams) => {
  return {
    size: 0,
    query: {
      bool: {
        filter: [
          {
            match: {
              appKey: params.appKey,
            },
          },
          {
            match: {
              release: params.release,
            },
          },
          {
            match: {
              environment: params.environment,
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
                gte: params.from,
                lte: params.to,
              },
            },
          },
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

export const viewTrend = (params: TrendRangeParams & CommonParams) => {
  return {
    size: 0,
    query: {
      bool: {
        filter: [
          {
            match: {
              appKey: params.appKey,
            },
          },
          {
            match: {
              release: params.release,
            },
          },
          {
            match: {
              environment: params.environment,
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
                gte: params.from,
                lte: params.to,
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
          fixed_interval: params.interval + "m",
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
