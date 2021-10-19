import React from "react";
import styled from "styled-components";

const GlobalFooter = styled.div`
  width: 100%;
  padding: 30px 0 20px;
  p {
    color: #ccc;
    text-align: center;
    margin-bottom: 0;
  }
`;

const Footer = () => {
  return (
    <GlobalFooter>
      <p>Copyright © 2021 Dora</p>
    </GlobalFooter>
  );
};

export default Footer;
