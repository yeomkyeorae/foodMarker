import React from "react";
import styled from "styled-components";

const FooterDiv = styled.footer`
  width: 100%;
  height: 50px;
  bottom: 0;
  background: gray;
  color: white;
  overflow: hidden;
`;

const FooterP = styled.p`
  padding: 10px 0;
  text-align: center;
`;

function Footer() {
  return (
    <FooterDiv>
      <FooterP>Copyright &copy; 2021. All Rights Reserved.</FooterP>
    </FooterDiv>
  );
}

export default Footer;
