import React from "react";
import styled from "styled-components";

export const HeaderStyle = styled.div`
  width: 100%;
  height: 48px;
  line-height: 48px;
  position: fixed;
  top: 0;
  right: 0;
  background: #001529;
  z-index: 1000;

  display: flex;
  padding: 0 0 0 16px;

  .header-right-content {
    flex-shrink: 0;
    display: flex;
    min-width: 192px;

    .logo {
      min-width: 165px;

      img {
        display: inline-block;
        height: 32px;
        vertical-align: middle;
      }

      h1 {
        display: inline-block;
        margin: 0 0 0 12px;
        color: #fff;
        font-weight: 400;
        font-size: 16px;
        vertical-align: top;
      }
    }
  }

  .header-center-content {
    flex: 1;

    .ant-menu-horizontal {
      line-height: 48px;
    }
  }

  .header-right-content {
    flex-shrink: 0;
  }
`;
