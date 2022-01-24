import * as React from "react";
import styled from "styled-components";
import Header from "@/components/Header";

const Body = styled.div`
  padding-top: 46px;
  min-height: 100vh;
  background: #f0f2f5;

  .ant-pro-sider-fixed {
    top: 48px !important;
    height: auto !important;
    bottom: 0;
  }
`;

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
    </>
  );
};

export default MainLayout;
