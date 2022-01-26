interface Project {
  id: number;
  name: string;
  type: string;
  detail: string;
}

interface ListPages<T> {
  items: T[];
  limit: number;
  page: number;
  total: number;
}

interface TrendRangeParams {
  from?: number;
  to?: number;
  interval?: string;
}

interface RangeParams {
  from?: number;
  to?: number;
}

interface CommonParams {
  size?: number;
  appKey?: string;
  type?: string;
  release?: string;
  environment?: string;
  fingerprint?: string;
}

interface Project {
  id: number;
  appKey: string;
  type: string;
  name: string;
  detail: string;
}

interface UrlFilter {
  tag?: string;
  release?: string;
  environment?: string;
  from?: number;
  to?: number;
}
