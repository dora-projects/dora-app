import React from "react";
import styled from "styled-components";

export const HeaderStyle = styled.div`
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);

  display: flex;
  padding: 0 0 0 16px;

  .header-right-content {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    min-width: 192px;

    .logo {
      width: 32px;
      height: 32px;
      margin-right: 20px;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: #f2f4f6;

        .logo-img {
          display: none;
        }

        .home-img {
          display: block;
        }
      }

      .logo-img {
        display: block;
      }

      .home-img {
        display: none;
      }

      img {
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
    }

    .switch {
      padding: 4px 15px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        border-radius: 3px;
        background-color: #f2f4f6;

        .anticon {
          color: #000;
        }
      }

      .name {
        margin-right: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }

      .anticon {
        color: #a6a6a6;
      }
    }
  }

  .header-center-content {
    flex: 1;

    .ant-menu-horizontal {
      line-height: 48px;
      border-bottom: none;
    }
  }

  .header-right-content {
    flex-shrink: 0;
  }
`;
