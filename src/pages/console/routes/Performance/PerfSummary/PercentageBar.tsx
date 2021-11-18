import React from "react";
import styled from "styled-components";
import { EVALUATE_COLOR } from "@/utils/chart";

const Percentage = styled.div<{
  good: { color: string; ratio: number };
  meh: { color: string; ratio: number };
  bad: { color: string; ratio: number };
}>`
  height: 16px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #fff;
  display: grid;
  grid-template-columns: ${(props) => `${props.good.ratio}fr ${props.meh.ratio}fr ${props.bad.ratio}fr`};
  margin-bottom: 8px;
  border-radius: 2px;

  .good {
    background-color: ${(props) => `${props.good.color}`};
  }

  .med {
    background-color: ${(props) => `${props.meh.color}`};
  }

  .bad {
    background-color: ${(props) => `${props.bad.color}`};
  }
`;

interface Props {
  good: number;
  meh: number;
  bad: number;
}

const PercentageBar = (props: Props) => {
  const { good, meh, bad } = props;
  return (
    <Percentage
      good={{ color: EVALUATE_COLOR.Good, ratio: good }}
      meh={{ color: EVALUATE_COLOR.Me, ratio: meh }}
      bad={{ color: EVALUATE_COLOR.Bad, ratio: bad }}
    >
      <div className="good" />
      <div className="med" />
      <div className="bad" />
    </Percentage>
  );
};

export default PercentageBar;
