/**
 * 保留 object 中的部分内容
 * @param obj
 * @param keys
 */
export function pick(obj: Record<string, unknown>, keys: string[]) {
  const r: Record<string, unknown> = {};
  keys.forEach((key) => {
    r[key] = obj[key];
  });
  return r;
}
