import React from "react";
import { useRequest } from "ahooks";
import { getAlertLogs } from "@/services/alert";
import { useConsoleProjectInfo } from "@/pages/projects/store/project";
import { formatDate } from "@/utils/date";
import { useFilterStore } from "@/pages/projects/store/filterBar";

const AlertLogs = () => {
  const { value: filterValue } = useFilterStore();
  const projectId = useConsoleProjectInfo((s) => s.project?.id);

  const { data: alertLogs, run } = useRequest((args) => getAlertLogs(args), {
    manual: true,
  });

  React.useEffect(() => {
    run({
      projectId,
      from: filterValue?.from,
      to: filterValue?.to,
    }).then();
  }, [run, projectId, filterValue?.from, filterValue?.to]);

  const list = alertLogs?.data;

  return (
    <div>
      {list?.map((item: any) => {
        return (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            {formatDate(item.createdAt)}【{item.rule?.name}】- {item.content}
          </div>
        );
      })}
    </div>
  );
};

export default AlertLogs;
