import React from "react";
import styled from "styled-components";

export const ArtifactItem = styled.div`
  padding: 30px 20px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 5px;

  .info {
    margin-bottom: 10px;

    .label {
      font-size: 14px;
      color: #666;
    }

    .value {
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }

    .version {
      display: block;
      font-size: 20px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
