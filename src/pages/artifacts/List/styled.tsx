import React from "react";
import styled from "styled-components";

export const ArtifactItem = styled.div`
  padding: 15px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 5px;

  .info {
    margin-bottom: 10px;

    .item {
      margin-bottom: 5px;
    }

    .label {
      font-size: 14px;
      color: #888888;
    }

    .value {
      font-size: 16px;
      font-weight: 400;
      color: #000;

      &.bold {
        font-weight: 600;
      }

      &.green {
        color: green;
      }
    }
  }
`;
