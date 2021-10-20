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
  min-height: 300px;

  .list-panel {
    .project-item {
      height: 80px;
      position: relative;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 4px;
      display: flex;
      align-items: center;

      &:hover {
        text-decoration: underline;
        box-shadow: 0 3px 6px 4px rgb(0 82 217 / 5%);
        .icon {
          opacity: 0.5;
        }
      }

      &.active {
        border-color: #0052d9;
        background: rgb(0 82 217 / 5%);
      }

      .left {
        flex: 1;
        padding: 10px 15px;

        .l1 {
          font-size: 16px;
        }

        .l2 {
          font-size: 12px;
          color: #666;
        }
      }

      .right {
        opacity: 0;
        padding: 10px 15px;
        flex-shrink: 0;
      }
    }
  }
`;
