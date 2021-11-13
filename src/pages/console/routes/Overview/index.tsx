import React from "react";
import ProCard, { StatisticCard } from "@ant-design/pro-card";
import ErrorTrend from "@/pages/console/routes/Overview/ErrorTrend";
import { dateNowWithWeek } from "@/utils/date";
import { useParams } from "react-router-dom";
import FilterBar from "@/pages/console/components/FilterBar";

const { Statistic } = StatisticCard;

const Overview = () => {
  const params = useParams();
  const appKey = params.appKey;

  // const { data } = useRequest(() => queryByEql({ eql: errorCount(appKey) }), {
  //   ready: !!appKey,
  //   refreshDeps: [appKey],
  // });
  const data: any = null;

  const errorCount = data?.data?.aggregations?.count?.value || 0;
  const dateNow = dateNowWithWeek();

  const responsive = false;
  return (
    <div style={{ padding: "20px" }}>
      <FilterBar />
      <ProCard
        title="数据概览"
        extra={`${dateNow}`}
        split={responsive ? "horizontal" : "vertical"}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: "访问量",
                  value: 234,
                  description: <Statistic title="较昨天" value="8.04%" trend="up" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: "错误",
                  value: errorCount,
                  description: <Statistic title="较昨天" value="8.04%" trend="down" />,
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard title="错误趋势" chart={<ErrorTrend />} />
        </ProCard>
        <StatisticCard
          title="ddd"
          chart={
            <></>
            // <img
            //   src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
            //   alt="大盘"
            //   width="100%"
            // />
          }
        />
      </ProCard>
    </div>
  );
};

export default Overview;
