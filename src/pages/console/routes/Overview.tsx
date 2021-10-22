import { Button } from "antd";
import EChartsForReact from "@/components/EChartsForReact";
import { useRequest } from "ahooks";
import { queryByEql } from "@/services/analysis";

const Overview = () => {
  console.log("Overview");

  const { run } = useRequest(queryByEql, { manual: true });

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          run({
            eql: {
              size: 0,
              query: {
                bool: {
                  filter: [
                    {
                      match: {
                        appKey: "d6eca399952c4c0ca067f28987aeed48",
                      },
                    },
                    {
                      match: {
                        type: "error",
                      },
                    },
                    // {
                    //   range: {
                    //     ts: {
                    //       gte: 123123,
                    //       lte: 123123,
                    //     },
                    //   },
                    // },
                  ],
                },
              },
              aggregations: {
                count: {
                  cardinality: {
                    field: "event_id.keyword",
                  },
                },
              },
            },
          });
        }}
      >
        查询
      </Button>
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
