import React from "react";
import { Empty, Spin, Pagination, Card } from "antd";
import { useRequest } from "ahooks";
import { getIssues } from "@/services/issue";
import { IssuesList } from "./styled";
import { formNow } from "@/utils/public";
import { useSettingStore } from "@/stores/setting";

const Issues = () => {
  const appKey = useSettingStore((state) => state.project?.appKey);

  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 10,
  });

  const { data, run, loading } = useRequest(
    () => getIssues({ appKey: appKey!, page: pagination.page, limit: pagination.pageSize }),
    {
      refreshDeps: [pagination, appKey],
    }
  );

  const list = data?.data?.items;
  const total = data?.data?.meta?.totalItems || 0;

  let empty = null;
  if (!list || list?.length <= 0) {
    empty = <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Card title="错误列表">
        <Spin spinning={loading}>
          {empty ? (
            empty
          ) : (
            <IssuesList>
              {list?.map((item) => {
                return (
                  <div className="issue-item" key={item.id}>
                    <div className="content">
                      <div className="type">{item.type}</div>
                      <div className="value">{item.value}</div>
                    </div>
                    <div className="footer">
                      <div>{item.total}次</div>
                      <div>{item.environment}</div>
                      <div>v{item.release}</div>
                      <div>
                        最近：{formNow(item.recently)} - 最早：{formNow(item.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pagination">
                <Pagination
                  total={total}
                  current={pagination.page}
                  pageSize={pagination.pageSize}
                  showSizeChanger
                  pageSizeOptions={["5", "10", "20"]}
                  onChange={(page, pageSize) => {
                    setPagination({ ...pagination, page, pageSize: pageSize || 10 });
                  }}
                />
              </div>
            </IssuesList>
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default Issues;
