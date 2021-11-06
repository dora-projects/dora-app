import styled from "styled-components";

export const ProjectItem = styled.div<{ active: boolean }>`
  height: 130px;
  position: relative;
  padding: 10px 15px;
  border-radius: 4px;

  border: ${(props) => (props.active ? "1px solid rgba(0,82,217,0.24)" : "1px solid #e3e3e3")};
  box-shadow: ${(props) => (props.active ? "0 3px 6px 4px rgba(0,82,217,0.1)" : "none")};
  // background-color: ${(props) => (props.active ? "rgba(0,82,217,0.24)" : "none")};

  //&:hover {
  //  box-shadow: 0 3px 6px 4px rgb(0 82 217 / 11%);
  //}

  .info {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .head {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      .name {
        font-size: 16px;
      }

      .detail {
        font-size: 14px;
        color: #666;
      }
    }

    .foot {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .stat {
        display: flex;

        .count-item {
          margin-right: 10px;

          span:first-child {
            color: gray;
          }

          span:last-child {
            color: #000000;
          }
        }
      }

      .setting {
        cursor: pointer;
        display: flex;
        padding: 5px;
      }
    }
  }

  .type-icon {
    position: absolute;
    right: 0;
    top: 0;
    color: #eaeaea;
    font-size: 80px;
  }
`;
