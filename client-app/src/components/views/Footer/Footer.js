import React from "react";
import styled from "styled-components";

const FooterDiv = styled.footer`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background: gray;
  color: white;
  overflow: hidden;
`;

// style="position:absolute; bottom:0px; height:200px; left:0px; right:0px; overflow:hidden;

const FooterP = styled.p`
  padding: 10px 0;
  text-align: center;
`;

function Footer(props) {
  return (
    <FooterDiv>
      <FooterP>Copyright &copy; 2021. All Rights Reserved.</FooterP>
    </FooterDiv>
  );
}

export default Footer;
