import React from "react";
import styled from "styled-components";

const FooterDiv = styled.footer`
  width: 100%;
  height: 50px;
  bottom: 0;
  position: ${props => props.position === "fixed" ? "fixed;" : "relative;"};
  background: gray;
  color: white;
  overflow: hidden;
`;

const FooterP = styled.p`
  padding: 10px 0;
  text-align: center;
`;

function Footer(props) {
  const { position } = props;

  return (
    <FooterDiv position={position}>
      <FooterP>Copyright &copy; 2021. All Rights Reserved.</FooterP>
    </FooterDiv>
  );
}

export default Footer;
