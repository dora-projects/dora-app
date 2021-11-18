import React from "react";
import { Tooltip } from "antd";
import { WrapItem, Summary, ChartBox } from "./styled";
import PercentageBar from "./PercentageBar";
import Histogram from "./Histogram";
import { formatterPercent, msFormat } from "@/utils/helper";

interface Props {
  title: string;
  p75: number;
  ratios: {
    good: number;
    meh: number;
    bad: number;
  };
  histogram: { key: number; doc_count: number }[];
  evaluate: { Good: number; Meh: number; Bad: number };
}

const PerfSummary = (props: Props) => {
  const { title, p75, ratios, histogram, evaluate } = props || {};
  return (
    <WrapItem>
      <Summary>
        <p className="p1">{title}</p>
        <p className="p2">{msFormat(p75)}ms</p>
        <PercentageBar good={ratios?.good} meh={ratios?.meh} bad={ratios?.bad} />
        <div className="p3">
          <Tooltip placement="bottom" title={`Good: <${evaluate.Good}ms`}>
            <div className="good">
              <span>好：</span>
              <span>{formatterPercent(ratios?.good)}%</span>
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title={`Meh: >${evaluate.Good}ms`}>
            <div className="meh">
              <span>一般：</span>
              <span>{formatterPercent(ratios?.meh)}%</span>
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title={`Bad: >${evaluate.Bad}ms`}>
            <div className="bad">
              <span>差：</span>
              <span>{formatterPercent(ratios?.bad)}%</span>
            </div>
          </Tooltip>
        </div>
      </Summary>
      <ChartBox>
        <Histogram data={histogram} />
      </ChartBox>
    </WrapItem>
  );
};

export default PerfSummary;
