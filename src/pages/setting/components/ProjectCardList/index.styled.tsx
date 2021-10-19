import styled from "styled-components";

export const ProjectItem = styled.div`
  height: 130px;
  position: relative;
  cursor: pointer;
  padding: 10px 15px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 3px 6px 4px rgb(0 82 217 / 11%);
  }

  .icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .l1 {
    font-size: 16px;
  }

  .l2 {
    font-size: 14px;
    color: #666;
  }
`;
