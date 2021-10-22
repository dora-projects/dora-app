import { Button, Divider } from "antd";
import { useRequest } from "ahooks";
import { StatisticCard } from "@ant-design/pro-card";
import { queryByEql } from "@/services/analysis";
import EChartsForReact from "@/components/EChartsForReact";
import { queryErrorCount } from "@/eql";
import { useSettingStore } from "@/stores/setting";

const Overview = () => {
  const appKey = useSettingStore((state) => state.project?.appKey);
  const { data } = useRequest(() => queryByEql({ eql: queryErrorCount(appKey) }), {
    ready: !!appKey,
  });
  const errorCount = data?.data?.aggregations?.count?.value || 0;

  const responsive = false;
  return (
    <div style={{ padding: "20px" }}>
      <StatisticCard.Group title="核心指标" direction={responsive ? "column" : "row"}>
        <StatisticCard
          statistic={{
            title: "今日PV",
            value: 79,
          }}
        />
        <Divider type={responsive ? "horizontal" : "vertical"} />
        <StatisticCard
          statistic={{
            title: "错误次数",
            value: errorCount,
          }}
        />
        <Divider type={responsive ? "horizontal" : "vertical"} />
      </StatisticCard.Group>
      <EChartsForReact
        option={{
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: "line",
            },
          ],
        }}
      />
    </div>
  );
};

export default Overview;
