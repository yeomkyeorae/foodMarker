import React from "react";
import * as S from "./LandingPage.style";

function LadingPage(): React.ReactElement {
  return (
    <S.Section>
      <S.Div>
        <S.Content className="content">
          <S.ContentH1>Food Marker</S.ContentH1>
          <S.Btn href="/loginSignup">GET STARTED</S.Btn>
        </S.Content>
      </S.Div>
    </S.Section>
  );
}

export default LadingPage;
