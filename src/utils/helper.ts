export const safeJsonParser = (d: string) => {
  try {
    return JSON.parse(d);
  } catch (e) {
    console.error(e);
    return null;
  }
};
