import React, { useEffect } from "react";
import styled, { css } from "styled-components";

const Section = styled.section`
  width: 100%;
  height: 100%;
  margin: auto;
  background: url("https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80")
    no-repeat 50% 50%;
  top: 0;
  display: table;
  background-size: cover;
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
