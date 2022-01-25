import React from "react";
import styled from "styled-components";

export const IssuesList = styled.div`
  .issue-item {
    cursor: pointer;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
      background: #f6f6f6;
    }

    .content {
      margin-bottom: 5px;

      .type {
        color: #ccc;
        font-weight: bold;
      }

      .value {
        font-size: 18px;
      }
    }

    .footer {
      display: flex;
      font-size: 12px;
      color: #666;

      > div {
        margin-right: 20px;
      }
    }
  }

  .pagination {
    padding: 20px 0;
    display: flex;
    justify-content: center;
  }
`;
