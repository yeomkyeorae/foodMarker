import React from "react";
import * as S from "./LandingPage.style";

function LadingPage(): React.ReactElement {
  return (
    <S.Container>
      <S.Content>
        <S.Title>Food Marker</S.Title>
        <S.Link href="/loginSignup">시작하기</S.Link>
      </S.Content>
    </S.Container>
  );
}

export default LadingPage;
