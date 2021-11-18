import React from "react";
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
}

const PerfSummary = (props: Props) => {
  const { title, p75, ratios, histogram } = props || {};
  return (
    <WrapItem>
      <Summary>
        <p className="p1">{title}</p>
        <p className="p2">{msFormat(p75)}ms</p>
        <PercentageBar good={ratios?.good} meh={ratios?.meh} bad={ratios?.bad} />
        <div className="p3">
          <div>
            <span>好：</span>
            <span>{formatterPercent(ratios?.good)}%</span>
          </div>
          <div>
            <span>一般：</span>
            <span>{formatterPercent(ratios?.meh)}%</span>
          </div>
          <div>
            <span>差：</span>
            <span>{formatterPercent(ratios?.bad)}%</span>
          </div>
        </div>
      </Summary>
      <ChartBox>
        <Histogram data={histogram} />
      </ChartBox>
    </WrapItem>
  );
};

export default PerfSummary;
