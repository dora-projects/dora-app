import { default as dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export const formatDate = (date: number) => dayjs(date).format("MMMM D, YYYY h:mm A");
export const formNow = (d: any) => dayjs(d).fromNow(true);
