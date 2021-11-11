import styled from "styled-components";

export const ProjectItem = styled.div`
  height: 130px;
  position: relative;
  padding: 10px 15px;
  border-radius: 4px;

  border: 1px solid #e3e3e3;
  box-shadow: none;

  &.active {
    border: 1px solid rgba(0, 82, 217, 0.24);
    box-shadow: 0 3px 6px 4px rgba(0, 82, 217, 0.2);

    &:before {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid #0052d9;
      border-top-color: transparent;
      border-left-color: transparent;
    }

    &:after {
      content: "";
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;
      border: 2px solid #fff;
      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }

  .item-panel {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .head {
      cursor: pointer;

      .label {
        font-size: 12px;
        color: #666;
      }

      .name {
        font-size: 16px;
        color: #0052d9;

        &:hover {
          text-decoration: underline;
        }
      }

      .detail {
        font-size: 14px;
        color: #666;
      }
    }

    .body {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .stat {
        display: flex;

        .count-item {
          font-size: 12px;
          margin-right: 10px;

          span:first-child {
            color: gray;
          }

          span:last-child {
            color: #000000;
          }
        }
      }
    }

    .foot {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 12px;
    }
  }

  .setting-icon {
    cursor: pointer;
    padding: 5px;

    z-index: 100;
    position: absolute;
    right: 5px;
    top: 5px;
    color: #eaeaea;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .type-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #eaeaea;
    font-size: 80px;
  }
`;
