import React, { useEffect } from "react";
import styled, { css } from "styled-components";

const Section = styled.section`
  background-color: yellow;
`;

function LadingPage() {
  useEffect(() => {}, []);

  return (
    <Section>
      <div className="in1">
        <div className="content">
          <h2>Food Marker</h2>
          <a href="#">GET STARTED</a>
        </div>
      </div>
    </Section>
  );
}

export default LadingPage;
