import { parse, stringify } from "query-string";
import React from "react";

export const useUrlQueryStore = () => {
  const query = window.location.search;

  // @ts-ignore
  const parsed = React.useMemo<UrlFilter>(() => {
    return parse(query, { parseNumbers: true });
  }, [query]);

  return {
    filterVal: parsed,
  };
};
