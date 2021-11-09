import { Button, Divider } from "antd";
import { useRequest } from "ahooks";
import ProCard, { StatisticCard } from "@ant-design/pro-card";
import { queryByEql } from "@/services/analysis";
import { queryErrorCount } from "@/eql";
import { useSettingStore } from "@/stores/setting";
import ErrorTrend from "@/pages/console/routes/Overview/ErrorTrend";
import dayjs from "dayjs";

const { Statistic } = StatisticCard;

const Overview = () => {
  const appKey = useSettingStore((state) => state.project?.appKey);
  const { data } = useRequest(() => queryByEql({ eql: queryErrorCount(appKey) }), {
    ready: !!appKey,
  });
  const errorCount = data?.data?.aggregations?.count?.value || 0;
  const todayStr = dayjs().format("YYYY年M月D日");

  const responsive = false;
  return (
    <div style={{ padding: "20px" }}>
      <ProCard title="数据概览" extra={todayStr} split={responsive ? "horizontal" : "vertical"} headerBordered bordered>
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
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: "xx",
                  value: "12/56",
                  suffix: "个",
                }}
              />
              <StatisticCard
                statistic={{
                  title: "xxxx",
                  value: "134",
                  suffix: "个",
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
