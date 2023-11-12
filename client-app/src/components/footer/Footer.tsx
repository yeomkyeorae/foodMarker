import React from 'react';
import * as S from './Footer.style';

type Props = {
  marginTop?: number;
  position?: string;
};

function Footer({ position, marginTop }: Props): React.ReactElement {
  return (
    <S.Container marginTop={marginTop} position={position}>
      <S.Content>Copyright &copy; 2023. All Rights Reserved.</S.Content>
    </S.Container>
  );
}

export default Footer;
