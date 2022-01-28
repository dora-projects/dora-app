import React from "react";
import { Empty, Spin, Pagination, Card } from "antd";
import { useRequest } from "ahooks";
import { getIssues } from "@/services/issue";
import { IssuesList } from "./styled";
import FilterBar from "@/components/FilterBar";
import { formNow } from "@/utils/date";
import { useParams, useNavigate } from "react-router-dom";
import useUrlState from "@ahooksjs/use-url-state";
import moment from "moment";

export const Issues = () => {
  const navigate = useNavigate();
  const params = useParams();
  const appKey = params.appKey;

  const [filterVal, setFilters] = useUrlState(
    {
      release: null,
      environment: null,
      tag: "today",
      from: moment().startOf("day").valueOf(),
      to: moment().valueOf(),

      page: 1,
      limit: 10,
    },
    {
      navigateMode: "replace",
      parseOptions: { parseNumbers: true },
    }
  );

  const { data, loading } = useRequest(
    () =>
      getIssues({
        appKey: appKey!,
        page: filterVal.page,
        limit: filterVal.limit,
        release: filterVal?.release,
        environment: filterVal?.environment,
        from: filterVal?.from,
        to: filterVal?.to,
      }),
    {
      ready: Boolean(filterVal?.from && filterVal?.to),
      refreshDeps: [filterVal, appKey],
      throttleWait: 100,
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
      <FilterBar
        value={filterVal}
        onChange={(v) => {
          setFilters({ ...v, limit: 10, page: 1 });
        }}
      />
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
                      navigate(`/project/${item.appKey}/monitor/issues/${item.fingerprint}`);
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
                  current={filterVal.page}
                  pageSize={filterVal.limit}
                  showSizeChanger
                  pageSizeOptions={["5", "10", "20"]}
                  onChange={(page, pageSize) => {
                    setFilters({ ...filterVal, page, limit: pageSize || 10 });
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
