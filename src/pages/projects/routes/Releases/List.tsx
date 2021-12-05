import React from "react";
import { ReleaseItem } from "./styled";
import { formNow } from "@/utils/date";
import { msFormat } from "@/utils/helper";
import { Empty } from "antd";

interface Props {
  list: any[];
}

const List = (props: Props) => {
  if (!props.list || props.list?.length <= 0) {
    return (
      <div style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
      </div>
    );
  }

  return (
    <>
      {props.list?.map((item: any) => {
        return (
          <ReleaseItem key={item.key}>
            <div className="total">
              <div className="tag">{item.key}</div>
              <div className="time">
                <span className="latest">{formNow(item.latest?.value_as_string)} — </span>
                <span className="earliest">{formNow(item.earliest?.value_as_string)}</span>
              </div>
            </div>
            <div className="count">
              <div className="category">
                事件总数：<span>{item.countEvent?.value}</span>
              </div>
              <div className="category">
                错误总数：<span>{item.countError?.count?.value}</span>
              </div>
            </div>
            <div className="perf">
              <div className="metric">
                fp：<span>{msFormat(item.fp?.values?.["75.0"], 3)}</span>ms
              </div>
              <div className="metric">
                fcp：<span>{msFormat(item.fcp?.values?.["75.0"], 3)}</span>ms
              </div>
              <div className="metric">
                lcp：<span>{msFormat(item.lcp?.values?.["75.0"], 3)}</span>ms
              </div>
              <div className="metric">
                fid：<span>{msFormat(item.fid?.values?.["75.0"], 3)}</span>ms
              </div>
              <div className="metric">
                cls：<span>{msFormat(item.cls?.values?.["75.0"], 3)}</span>ms
              </div>
            </div>
          </ReleaseItem>
        );
      })}
    </>
  );
};

export default List;
