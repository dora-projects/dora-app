import React from "react";
import { Empty, Spin, Pagination, Card } from "antd";
import { useRequest } from "ahooks";
import { getIssues } from "@/services/issue";
import { IssuesList } from "./styled";
import FilterBar from "@/components/FilterBar";
import { formNow } from "@/utils/date";
import { useParams, useNavigate } from "react-router-dom";
import { useFilterStore } from "@/stores/filterBar";
import useUrlState from "@/utils/useUrlState";

const Issues = () => {
  const navigate = useNavigate();
  const params = useParams();
  const appKey = params.appKey;
  const { value } = useFilterStore();

  const [pagination, setPagination] = useUrlState({
    page: 1,
    limit: 10,
  });

  const { data, run, loading } = useRequest(
    () =>
      getIssues({
        appKey: appKey!,
        page: pagination.page,
        limit: pagination.limit,
        release: value?.release,
        environment: value?.environment,
        from: value?.from!,
        to: value?.to!,
      }),
    {
      refreshDeps: [pagination, appKey, value],
    }
  );

  const list = data?.data?.items;
  const total = data?.data?.total || 0;

  let empty = null;
  if (!list || list?.length <= 0) {
    empty = <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <Card style={{}}>
        <Spin spinning={loading}>
          {empty ? (
            empty
          ) : (
            <IssuesList>
              {list?.map((item) => {
                return (
                  <div
                    className="issue-item"
                    key={item.id}
                    onClick={() => {
                      navigate(`/projects/${item.appKey}/console/issues/${item.fingerprint}`);
                    }}
                  >
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
                  pageSize={pagination.limit}
                  showSizeChanger
                  pageSizeOptions={["5", "10", "20"]}
                  onChange={(page, pageSize) => {
                    setPagination({ ...pagination, page, limit: pageSize || 10 });
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
