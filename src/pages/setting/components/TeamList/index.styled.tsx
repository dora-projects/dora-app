import styled from "styled-components";

export const ListContainer = styled.div`
  padding: 0 0 40px;
`;

export const ListItem = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.active {
    transition: background-color 0.3s;
    background-color: rgba(163, 211, 255, 0.3);

    .create-icon {
      background-color: rgba(163, 211, 255, 0.5);
    }
  }

  &:hover {
    transition: background-color 0.3s;
    background-color: rgba(163, 211, 255, 0.3);

    .create-icon {
      background-color: rgba(163, 211, 255, 0.5);
    }
  }

  .head {
    display: flex;
    align-items: center;

    .name {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }

  .operation {
    display: flex;
  }
`;

export const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 36px;
  height: 36px;
  font-size: 16px;
  border-radius: 5px;
  font-weight: bolder;
  background-color: #262f3e;
`;
