import React from "react";
import { useRequest } from "ahooks";
import { getAlertLogs } from "@/services/alert";
import { useCurrentProjectInfo } from "@/stores";
import { formatDate } from "@/utils/date";
import { useUrlQueryStore } from "@/stores";

const AlertLogs = () => {
  const { filterVal } = useUrlQueryStore();
  const projectId = useCurrentProjectInfo((s) => s.project?.id);

  const { data: alertLogs, run } = useRequest((args) => getAlertLogs(args), {
    manual: true,
  });

  React.useEffect(() => {
    run({
      projectId,
      from: filterVal?.from,
      to: filterVal?.to,
    });
  }, [run, projectId, filterVal?.from, filterVal?.to]);

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
