export const errorCount = (params: RangeParams & CommonParams) => {
  let filter = [{ match: { appKey: params.appKey } }, { match: { type: "error" } }] as any;

  if (params.release) {
    filter.push({ match: { release: params.release } });
  }

  if (params.environment) {
    filter.push({ match: { environment: params.environment } });
  }

  return {
    size: 0,
    query: {
      bool: {
        filter: [
          ...filter,
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

export const errorTrend = (params: TrendRangeParams & CommonParams) => {
  let filter = [{ match: { appKey: params.appKey } }, { match: { type: "error" } }] as any;

  if (params.release) {
    filter.push({ match: { release: params.release } });
  }
  if (params.environment) {
    filter.push({ match: { environment: params.environment } });
  }

  return {
    size: 0,
    query: {
      bool: {
        filter: [
          ...filter,
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
          fixed_interval: params.interval,
          time_zone: "+08:00",
          format: "yyyy-MM-dd HH:mm:ss",
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

export const errorLogs = (params: RangeParams & CommonParams & { fingerprint?: string }) => {
  let filter = [{ match: { appKey: params.appKey } }, { match: { type: "error" } }] as any;

  if (params.fingerprint) {
    filter.push({ match: { fingerprint: params.fingerprint } });
  }

  if (params.release) {
    filter.push({ match: { release: params.release } });
  }

  if (params.environment) {
    filter.push({ match: { environment: params.environment } });
  }

  return {
    size: 100,
    query: {
      bool: {
        filter: [
          ...filter,
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
  };
};
