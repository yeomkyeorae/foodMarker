import React from "react";
import LoadingOverlay from "react-loading-overlay";
import styled from "styled-components";
import "./styles.css";

const OverlayDiv = styled.div`
`;

const DarkBackground = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;

function LoadingOverlayDiv({ showOverlay }: { showOverlay: boolean }): React.ReactElement | null {
  return (
    showOverlay ? (
      <OverlayDiv>
        <DarkBackground>
          <LoadingOverlay
            active={true}
            spinner={true}
            text="나의 맛집을 등록 중입니다"
          />
        </DarkBackground>
      </OverlayDiv>
    ) : null
  );
}

export default LoadingOverlayDiv;
