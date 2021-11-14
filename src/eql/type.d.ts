interface TrendRangeParams {
  from: number;
  to: number;
  interval: string;
}

interface RangeParams {
  from: number;
  to: number;
}

interface CommonParams {
  appKey?: string;
  release?: string;
  environment?: string;
}
