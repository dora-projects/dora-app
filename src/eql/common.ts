export const releaseList = (appKey: string) => {
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
        ],
      },
    },
    aggregations: {
      release: {
        terms: {
          field: "release.keyword",
          size: 50,
          order: {
            count: "desc",
          },
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

export const environmentList = (appKey: string) => {
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
        ],
      },
    },
    aggregations: {
      environment: {
        terms: {
          field: "environment.keyword",
          size: 50,
          order: {
            count: "desc",
          },
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
