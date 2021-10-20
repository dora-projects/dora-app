import * as React from "react";
import styled from "styled-components";

export const SwitchBtn = styled.div`
  cursor: pointer;
  padding-top: 15px;
  padding-bottom: 10px;
  line-height: 1.3;

  .l1 {
    display: inline-block;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .l2 {
    font-size: 12px;
    text-align: left;
  }
`;

export const TeamProjectSwitchPanel = styled.div`
  .list-panel {
    .project-item {
      position: relative;
      cursor: pointer;
      padding: 10px 15px;
      border: 1px solid #ccc;
      border-radius: 4px;

      //&:hover {
      //  box-shadow: 0 3px 6px 4px rgb(0 82 217 / 11%);
      //}

      &:hover {
        text-decoration: underline;
        box-shadow: 0 3px 6px 4px rgb(0 82 217 / 5%);
      }

      .icon {
        opacity: 0.5;

        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      .l1 {
        font-size: 16px;
      }

      .l2 {
        font-size: 12px;
        color: #666;
      }
    }
  }
`;
