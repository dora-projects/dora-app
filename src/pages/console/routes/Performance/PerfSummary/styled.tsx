import React from "react";
import styled from "styled-components";

export const WrapItem = styled.div`
  display: flex;
  height: 300px;
  padding: 20px 0;
  background-color: #fff;
  border: 1px solid #f0f0f0;
`;

export const ChartBox = styled.div`
  flex: 1;
`;

export const Summary = styled.div`
  width: 350px;
  flex-shrink: 0;
  //border: 1px solid #f0f0f0;
  //border-radius: 4px;
  padding: 15px 40px;

  p {
    margin-bottom: 0;
  }

  .p1 {
    font-size: 18px;
  }

  .p2 {
    font-size: 24px;
    font-weight: bold;
  }

  .p3 {
    display: flex;

    > div {
      margin-right: 20px;
    }
  }
`;
