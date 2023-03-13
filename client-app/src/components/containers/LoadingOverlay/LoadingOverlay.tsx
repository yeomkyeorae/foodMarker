import React from "react";
import LoadingOverlay from "react-loading-overlay";
import * as S from "./LoadingOverlay.style";

function LoadingOverlayDiv({ showOverlay }: { showOverlay: boolean }): React.ReactElement | null {
  return (
    showOverlay ? (
      <div>
        <S.DarkBackground>
          <LoadingOverlay
            active={true}
            spinner={true}
            text="나의 맛집을 등록 중입니다"
          />
        </S.DarkBackground>
      </div>
    ) : null
  );
}

export default LoadingOverlayDiv;
