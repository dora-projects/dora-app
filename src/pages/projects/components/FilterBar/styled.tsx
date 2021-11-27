import React from "react";
import styled, { css } from "styled-components";

export const Bar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
  border-radius: 2px;
`;

export const TagGroup = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
`;

export const Tag = styled.div`
  padding: 2px 8px;
  color: #3b82fe;
  border-radius: 3px;
  ${(props: { active: boolean }) =>
    props.active &&
    css`
      color: #fff;
      background-color: #3b82fe;
    `}
`;
