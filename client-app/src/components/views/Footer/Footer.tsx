import React from "react";
import * as S from './Footer.style';

type FooterProps = {
  marginTop?: number;
  position?: string;
};

function Footer({ position, marginTop }: FooterProps): React.ReactElement {
  return (
    <S.FooterDiv marginTop={marginTop} position={position}>
      <S.FooterP>Copyright &copy; 2022. All Rights Reserved.</S.FooterP>
    </S.FooterDiv>
  );
}

export default Footer;
