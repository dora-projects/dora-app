import { default as dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.locale("zh-cn");

export const dateNow = () => dayjs().format("YYYY年M月D日 H:m:s");
export const dateNowWithWeek = () => dayjs().format("YYYY年M月D日 dddd");
export const formatDate = (date: number) => dayjs(date).format("MMMM D, YYYY h:mm A");
export const formNow = (d: any) => dayjs(d).fromNow(true);

export default dayjs;
