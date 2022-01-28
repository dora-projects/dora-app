import React from "react";
import styled from "styled-components";

export const ReleaseItem = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 5px;

  .total {
    width: 200px;
    flex-shrink: 0;
    border-right: 1px solid #ccc;

    .version {
      display: block;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .time {
      > span {
        display: inline-block;
        font-size: 12px;
      }
    }
  }

  .count {
    display: flex;
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    border-right: 1px solid #ccc;

    .category {
      width: 150px;
      padding: 0 10px;
      color: #666;
      font-size: 12px;

      span {
        color: #181818;
        font-size: 18px;
      }
    }
  }

  .perf {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .metric {
      width: 170px;
      padding: 5px;
      color: #666;

      span {
        color: #181818;
        font-size: 18px;
      }
    }
  }
`;
