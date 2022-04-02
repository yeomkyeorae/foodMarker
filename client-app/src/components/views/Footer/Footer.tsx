import React from "react";
import styled from "styled-components";


const FooterDiv = styled.footer<{marginTop?: number; position?: string}>`
  width: 100%;
  height: 50px;
  left: 0;
  margin-top: ${props => props.marginTop ? `${props.marginTop}px` : '0px'};
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
  const { position, marginTop } = props;

  return (
    <FooterDiv marginTop={marginTop} position={position}>
      <FooterP>Copyright &copy; 2021. All Rights Reserved.</FooterP>
    </FooterDiv>
  );
}

export default Footer;
