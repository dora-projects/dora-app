import React from "react";
import styled from "styled-components";
import { EVALUATE_COLOR } from "@/utils/chart";

export const WrapItem = styled.div`
  display: flex;
  padding: 10px 0;
  background-color: #fff;
  border: 1px solid #f0f0f0;
`;

export const ChartBox = styled.div`
  flex: 1;
`;

export const Summary = styled.div`
  width: 380px;
  flex-shrink: 0;
  //border: 1px solid #f0f0f0;
  //border-radius: 4px;
  padding: 15px 40px 15px 40px;

  p {
    margin-bottom: 0;
  }

  .p1 {
    font-size: 18px;
  }

  .p2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .p3 {
    display: flex;
    justify-content: space-between;

    .good {
      color: ${EVALUATE_COLOR.Good};
    }

    .meh {
      color: ${EVALUATE_COLOR.Meh};
    }

    .bad {
      color: ${EVALUATE_COLOR.Bad};
    }

    > div {
      display: flex;
      align-items: center;

      span:first-child {
        font-size: 12px;
        color: #666;
      }

      span:last-child {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
`;
