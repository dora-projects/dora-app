import React from "react";
import { useRequest } from "ahooks";
import { getAlertLogs } from "@/services/alert";
import { formatDate } from "@/utils/date";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

const AlertLogs = () => {
  const projectId = useSelector((state: RootState) => state.userConfig?.project?.id);

  const { data: alertLogs, run } = useRequest((args) => getAlertLogs(args), {
    manual: true,
  });

  // React.useEffect(() => {
  //   run({
  //     projectId,
  //     from: filterVal?.from,
  //     to: filterVal?.to,
  //   });
  // }, [run, projectId, filterVal?.from, filterVal?.to]);

  const list = alertLogs?.data;

  return (
    <div>
      {list?.map((item: any) => {
        return (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            {formatDate(item.createdAt)}【{item.alert_rule?.name}】- {item.content}
          </div>
        );
      })}
    </div>
  );
};

export default AlertLogs;
