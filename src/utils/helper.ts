export const safeJsonParser = (d: string) => {
  try {
    return JSON.parse(d);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const humanTime = (n: number) => {
  if (n < 60) {
    return `${n}秒`;
  }
  if (n >= 60 && n < 60 * 60) {
    return `${n / 60}分钟`;
  }
  return `${n / 60 / 60}小时`;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), ms);
  });
