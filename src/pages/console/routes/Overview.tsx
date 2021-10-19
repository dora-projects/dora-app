import { Button } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import EChartsForReact from "@/components/EChartsForReact";

const Overview = () => {
  console.log("Overview");
  return (
    <div>
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
